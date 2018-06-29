#Web Crawler

## Getting Started
`npm install` installs dependencies

`npm start` runs the program

`npm test` runs Mocha + Chai tests

## Design
The crawler algorithm is simple:

	- Start with the first address link in an internet
	- Download the URL
	- Mark URL as visited and parse any links it may have
	- Repeat process on found links

In the interest of time, I allowed to crawler recurse immediately on new links since the "internets" it will process are small. This removed the need for a task queue, and simplified the implementation.

The project statement requires infinite crawl depth, so I did not build a recursion depth limit into the crawler.

I implemented End to End tests with Mocha and Chai to verify the output of the crawler against the solutions given in the project statement. Unit tests would be written given more time.

##Assumptions

- Unbounded concurrency: Promises are fired off as soon as links are parsed, which would cause performance to degrade rapidly with more links per page or a larger network. This can be fixed by creating a managed queue of URLs to fetch, and only processing the next URL after if there are fewer than `concurrencyLimit` requests pending.

- Infinite recursion: This is given in problem statement, but the crawler will recurse infinitely. Given a larger data set, the current solution would quickly become unusable. This can be fixed by passing a second parameter `recursionDepth` to the `crawl` function that gets incremented each recursive call, with a bound at a class property `this.maxDepth`.

- Small network: The internets being inspected can be handled by a single node process. As it stands, the code is made concurrent by using promises for control flow, but it is not parallel as it runs in a single node process.