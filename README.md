# About the Delivery-Fee App

This is a typescript-react based project that calculates a delivery fee based on user inputs. Conditions are defined for each input, which in turn affects the delivery fee charged. These conditions include:

- Delivery fee cannot be more that 15 Euros
- If the cart item is equal to or less that four(4), no surcharge is added to the delivery fee. However a 0.50 Euro is added for each addiditonal item. Furthermore, if the cart items are more than twelve(12), an extra bulk fee of 1.20 euros will be applied.
- If the cart value is less that 1000 cents (10 Euros), a surcharge will be added, which is the difference between 10 and the number entered by the user.
- A base delivery fee of two(2) euros is charged for distance (in meters) equal or less than 1000. A one(1) euro surcharge will be added for every additional 500 meters.
- on Fridays between 3pm - 7pm - rush hour, the overall delivery fee is increased by 20%.

## npm modules/packages

- moment
- dayjs
- material-UI
- Tailwind_CSS
- react-dom
- prop-types

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
