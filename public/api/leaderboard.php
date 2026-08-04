<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Accel-Expires: 0');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['https://sandbox.teoisthewinner.com', 'https://www.sandbox.teoisthewinner.com', 'https://teoisthewinner.com', 'https://www.teoisthewinner.com'];
if (in_array($origin, $allowedOrigins, true)) { header('Access-Control-Allow-Origin: ' . $origin); header('Vary: Origin'); }
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$dataDirectory = '/home/cascad42/private-data';
$dataFile = $dataDirectory . '/alcan-block-brigade-leaderboard.json';
if (!is_dir($dataDirectory)) { mkdir($dataDirectory, 0750, true); }

function clean_entries(array $entries): array {
    $clean = [];
    foreach ($entries as $entry) {
        if (!is_array($entry) || !isset($entry['name'], $entry['score'])) continue;
        $clean[] = ['name' => (string) $entry['name'], 'score' => max(0, (int) $entry['score']), 'miles' => max(0, (int) ($entry['miles'] ?? 0)), 'updatedAt' => (string) ($entry['updatedAt'] ?? '')];
    }
    usort($clean, fn(array $a, array $b): int => $b['score'] <=> $a['score']);
    return array_slice($clean, 0, 5);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $decoded = is_file($dataFile) ? json_decode((string) file_get_contents($dataFile), true) : [];
    echo json_encode(['scores' => clean_entries(is_array($decoded) ? $decoded : [])], JSON_UNESCAPED_SLASHES);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) { http_response_code(400); echo json_encode(['error' => 'Invalid score data']); exit; }
$name = trim((string) ($payload['name'] ?? ''));
$name = preg_replace('/[^\p{L}\p{N} _-]/u', '', $name) ?? '';
$name = function_exists('mb_substr') ? mb_substr($name, 0, 16) : substr($name, 0, 16);
$score = max(0, min(99999999, (int) ($payload['score'] ?? 0)));
$miles = max(0, min(999999, (int) ($payload['miles'] ?? 0)));
if ($name === '' || $score < 1) { http_response_code(422); echo json_encode(['error' => 'A nickname and score are required']); exit; }

$handle = fopen($dataFile, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) { http_response_code(503); echo json_encode(['error' => 'Leaderboard is temporarily unavailable']); exit; }
$contents = stream_get_contents($handle);
$entries = json_decode($contents ?: '[]', true);
if (!is_array($entries)) $entries = [];
$matched = false;
foreach ($entries as &$entry) {
    if (is_array($entry) && strcasecmp((string) ($entry['name'] ?? ''), $name) === 0) {
        $matched = true;
        if ($score > (int) ($entry['score'] ?? 0)) $entry = ['name' => $name, 'score' => $score, 'miles' => $miles, 'updatedAt' => gmdate('c')];
        break;
    }
}
unset($entry);
if (!$matched) $entries[] = ['name' => $name, 'score' => $score, 'miles' => $miles, 'updatedAt' => gmdate('c')];
$entries = clean_entries($entries);
rewind($handle); ftruncate($handle, 0); fwrite($handle, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)); fflush($handle); flock($handle, LOCK_UN); fclose($handle);
echo json_encode(['scores' => $entries], JSON_UNESCAPED_SLASHES);
