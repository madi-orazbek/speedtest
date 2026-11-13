# Internet Speed Test (Node.js)

A simple command-line tool written in Node.js that measures download speed by downloading a specified URL 10 times sequentially.

## Features

- Accepts a URL as a command-line argument.
- Performs 10 sequential HTTP requests.
- Waits for each response body to be fully downloaded before starting the next request.
- Measures the duration of each download.
- Calculates the average request time.
- Tracks the total amount of downloaded data.
- Calculates the average download speed in Mbps.
- Handles failed HTTP requests without stopping the entire test.

## Requirements

- Node.js 18 or newer.
- Internet connection.

No external dependencies are required.

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Navigate to the project directory:

```bash
cd YOUR_REPOSITORY
```

## Usage

Run the script and provide a URL as an argument:

```bash
node speedtest.js https://example.com/image.png
```

You can use any publicly accessible URL that returns a downloadable resource.

## Example Output

```text
Starting speed test: https://example.com/image.png
Number of requests: 10
-----------------------------------
Request 1/10...
Downloaded: 525343 bytes | Time: 245.32 ms
Request 2/10...
Downloaded: 525343 bytes | Time: 198.45 ms
...
-----------------------------------
SPEED TEST RESULTS
Successful requests: 10
Failed requests: 0
Total downloaded: 5.25 MB
Average request time: 215.67 ms
Download speed: 19.49 Mbps
```

*The values above are illustrative and may differ depending on your network connection and the server.*

## How It Works

1. The script receives a URL through `process.argv`.
2. The `fetch()` API sends an HTTP request.
3. The response body is read using asynchronous iteration (`for await...of`).
4. The downloaded data size is calculated using `chunk.byteLength`.
5. `performance.now()` measures the download duration.
6. A `for` loop performs 10 requests sequentially.
7. The script calculates the average request duration, total downloaded data, and download speed.

## Download Speed Formula

Download speed is calculated in megabits per second (Mbps):

```text
Speed (Mbps) = (Total Bytes × 8) / Total Time (seconds) / 1,000,000
```

## Notes

- Requests are performed sequentially, not in parallel.
- Only successful requests are included in the statistics.
- Download speed may vary depending on network conditions, server response time, caching, and resource size.
- The result represents the measured throughput for the selected URL, not necessarily the maximum speed of your internet connection.

## License

This project is available under the MIT License.
