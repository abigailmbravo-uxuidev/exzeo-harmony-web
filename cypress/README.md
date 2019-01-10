# cypress

### This is the temporary README for using cypress.

In another repository, `git clone
git@bitbucket.org:exzeo-usa/create-react-app.git`.
Navigate inside of this repository and checkout branch HAR-5616,
`git checkout HAR-5616`, then navigate into react/scripts
`cd packages/react-scripts`. Once here, run `npm link` to simlink this package.

After this is linked, return to your `harmony-web` directory
and `npm link @exzeo/react-scripts`. This will link your scripts
to the current (unpublished) build with the cypress script.

After this is linked, navigate back to your harmony-web directory
and run `npm run cypress` to test with the test runner,
or `npm run cypress -- --headless` to run in headless mode.