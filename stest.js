import { performance } from 'node:perf_hooks';

const url = process.argv[2];
const REQUEST_COUNT = 10;
if (!url) {
    console.error('Укажите URL файла для скачивания.');
    console.log('Пример запуска: node speedtest.js https://hetzner.de');
    process.exit(1);
}

async function runSpeedTest(url) {
    const start = performance.now();
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    let bytes = 0;
    for await (const chunk of response.body) {
        bytes += chunk.byteLength;
    }
    const end = performance.now();
    const duration = end - start;
    return { bytes, duration };
}

async function main() {
    let totalBytes = 0;
    let totalDuration = 0;
    let successfulRequests = 0;
    let failedRequests = 0;

    console.log(`Starting speed test: ${url}`);
    console.log(`Number of requests: ${REQUEST_COUNT}`);
    console.log('-----------------------------------');

    for (let i = 1; i <= REQUEST_COUNT; i++) {
        try {
            console.log(`Request ${i}/${REQUEST_COUNT}...`);

            const result = await runSpeedTest(url);

            totalBytes += result.bytes;
            totalDuration += result.duration;
            successfulRequests++;

            console.log(
                `Downloaded: ${result.bytes} bytes | ` +
                `Time: ${result.duration.toFixed(2)} ms`
            );

        } catch (error) {
            failedRequests++;
            console.error(`Request ${i} failed: ${error.message}`);
        }
    }

    console.log('-----------------------------------');
    console.log('SPEED TEST RESULTS');

    if (successfulRequests === 0) {
        console.error('No successful downloads. Cannot calculate speed.');
        return;
    }

    // Среднее время одного успешного запроса
    const averageTime = totalDuration / successfulRequests;

    // Переводим миллисекунды в секунды
    const totalTimeSeconds = totalDuration / 1000;

    // Рассчитываем скорость в мегабитах в секунду
    const speedMbps =
        (totalBytes * 8) / totalTimeSeconds / 1_000_000;

    console.log(`Successful requests: ${successfulRequests}`);
    console.log(`Failed requests: ${failedRequests}`);

    console.log(
        `Total downloaded: ${(totalBytes / 1_000_000).toFixed(2)} MB`
    );

    console.log(
        `Average request time: ${averageTime.toFixed(2)} ms`
    );

    console.log(
        `Download speed: ${speedMbps.toFixed(2)} Mbps`
    );
}

main();
