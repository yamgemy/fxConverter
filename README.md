# fxConverter

![ss3](https://i.postimg.cc/ZRTTbk1f/Screenshot-1641862445.png)![ss5](https://i.postimg.cc/50KvMm6R/Screenshot-1641864855.png)
![ss4](https://i.postimg.cc/g0bz7L4b/Screenshot-1641862375.png)![ss2](https://i.postimg.cc/8CdpgknJ/Screenshot-1641862389.png)


fxConverter, where fx stands for foreign exchange, provides the function of currency conversion based on conversion rates retrieved from a [free public API](https://freecurrencyapi.net/), and currencies' names from [another](https://openexchangerates.org/api/currencies.json). As an exposition to maneuvering with data handling in a React environment, the app also comes with data listing, update and delete. Evidently, aethestics are not within scope, things are laid out so long as they are not so hideous that could not be interacted with, without acquiring cancer.

fxConverter is my second attempt at using Typescript in React Native extensively, but for education purposes the first serious attempt in doing so, at least wherever applicable. Secondarily i aim to exercise deeper but arguably fundamental concerns on React Native frontend development such as normalization of data structure in the Redux store, considerations made in the process of render optimizations and the choice between adopting React-Query or adhering to the traditional way of request data into a centralized data store. To the experienced typed React developers viewing this repository, you will probably find instances where implementations were questionable and imperfect. But at this point i will lay out what i've got and address the above issues raised. 

## React-hook-form

React-hook-form was adopted with 2 purposes: 1. to eliminate unnecessary rerender of the paremt component where the inputs are embedded in, and 2. to delegate validation logic and error handling to existing libraries as well as decoupling them away from components. During implementation, it was discovered that unnecessary rerenders were still possible when some features were used from RNF. For example, the function `watch` and the option of `shouldValidate` in `setValue` will lead to always rerendering the entire parent component including the children components, despite being wrapped in hook forms' `Controller`. I found workarounds to using `watch` by instead checking whether the `errors` object was empty and whether the form values have been modified (`isDirty`). However, there was still the necessity to trigger rerender when errors change, in ordrr to display their corresponding messages, in the user interface.

A largely 'controlled component' approach was used for implementing the hook form inputs, where (majority of) required states are hosted on their parent component. This was done to enable the same form object being monitored across the input elements. Also, i have not exactly found the way to use [yup](https://www.npmjs.com/package/yup) resolver in conjunction with this approach.

## React Query vs Calls Inside Redux

I am not a regular user of React Query, but to explore, I initially experimented with React Query for data fetching, which was successful, but as the development went further, there arose the need to update and retrieve existing data. I tried `queryClient.setQueryData`, but it didn't work. I probably did something wrong. In addition to this was the amount of code related to queries looked to get increasingly complex, all cluttered up in the codes of a component. That was not quite my preferable way to do things as I am biased towards compartmentalizing categories of codes in different 'domains', or 'files'. One might extract all the query logics into hooks, but i am under the impression that this isn't strictly a structural make over, because hooks don't provide a shared context (correct me if i am wrong). I believe React query was designed in the way that a data cache should be shared among components, but it is my opinion that the documentations seemed ambiguous and often lack immediate examples following their citation of featured functions. Given a limited time frame, I redacted my use of React-Query early on and resorted to a more 'traditional' Redux approach. I found it easier also to customize refetch logic. Currently this was done only on whether to fetch fx rates when the same currency was selected as a base currency, and the deciding parameter is set to be a comparison between the time of the last fetch and the time of refetch. The comparison is arbitrarily set to be 1 minute at the moment.

## Redux Data Normalization

There is a substantial length of discussion on the [official Redux documentation on normalizing state shape](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape). What i extrapolated from the readings was that that each unique unit of data should be indexed by a key in a js object, and second, that each set of data are non-duplicated (docs saying each data has their own 'table') and third, as implied from the my first extrapolation, the basic building block of state data should therefore be an object (key + value inside `{}`. As per the limited data complexity in this current project, these preliminary extrapolations seemed sufficient for a start to get things going, (minus cranking out association 'tables') And already set it apart from my earlier days as a Redux novice, where i used arrays as a basic state data container. With an object containing indexed units of data, accessing a specific piece of data no longer requires looping / filtering through an entire array. This should already improve efficiency, and the gains in such scales with the amount of data, and so the 'coding overhead' are quite worth it considering that conforming a piece of data to a desired structure only occurs at their inception, and reverting back to arrays only occurs per data change/rerender (provided that things were done right) whereas potentially looping through an entire array is required every time a piece of data is require, especially undesirable when processes aren't related to renders. On the other hand, Redux also states that indexes should be an indicator to data orderings. Inadvertently, information of the current data already contains that, or enables so. For example, alphabetical order with currency abbreviation as key and chronological order when i set the millisecond of a date to be the key. Nevertheless, the current implementation addresses some of these concerns, and the exploration of normalizing Redux state shape continues.

## On Closures

Thanks to a recent share on LinkedIn, i borrowed a method of passing parameters into functions and still circumvent any need to invoke an arrow function in the props. To exemplify: instead of `prop={()=> someFunction(params)}`, now i have the way to do the same by `prop={createAnotherFunction(params)}`, where `createAnotherFunction` returns the actual target function, without causing immediate invocation of a target call during render (expectedly), or causing infinite rerenders and other strange things. But one thing i am still not 100% certain is how this works with `useCallback`, because the returning function sure isn't a direct descendent of the `useCallback` wrap. In my implementation i wrapped these function creators with `useCallback` still, but that's not because i was certain they apply to the returning functions; it was because these function creators were part of their embedding component as well as are being passed down to children components, so it was done to avoid unnecessary rerenders of children and recompiling of these functions when the component necessarily rerenders. Beyond props, they are still incredibly handy, such as when i need to 'convert' a Promise into a function to be used inside a 'call' by Redux Saga, or when i need to parameterize a certain view style.

## useState 101

An instance of me returning to a total noob. I have a local state `[selectedCurrencyButton, setSelectedCurrencyButton] = useState('someString')` in my converter component. It is used for remembering where the user clicked the currency button from, and this state is then used for updating the currencies selections in the Redux store. As it turned out, the latest state of this variable was incorrectly read upon the time of the second part as described above. I spent a good amount of time trying to add/remove/add again `useCallback`, but nothing worked. Then i circumvented the problem by directly passing this value through callbacks, just to get the code to read the fresh values. Voila, that worked. I wondered why, and suspected that it may be because `setSelectedCurrencyButton` didn't quite trigger rerender when `selectedCurrencyButton` wasn't used in the returning view, which now is. This proved to be not the case, as i did a quick check with React sandbox. Even when the state variable wasn't a part of the returning view, the component still re-runs when a change to this state value is invoked. <s>I still haven't pinpointed on the exact cause of this peculiarity (as i call it, probably not to the experienced React guru)</s>. Because of the complexity of the component (the interconnections among callbacks within, and the stuff they do from child components), I simply went around it as described above. Perhaps in another instance of implementation, this serves as a critical reminder on what might occur, arising from what ought to be regarded as a bread and butter aspect of React.

UPDATES: now use `useRef` hook to remember value of `selectedCurrencyButton`.  Also, it is not part of render to begin with. And after some thoughts, the fiasco described above seemed a lot like setting local state and then immediately reading this state, and obliviously of me, in a maze of other places, which is a common mistake. Again a quick sandbox validated that (i should have known setting state is asynchronous, what am i doing!). And perhaps because of that, when put as a dependency in `useCallback` they weren't read correctly either. In the end, still keeping the approach of passing fresh values (when it's possible) because out of the two ways, this pretty much guarantees reading exactly what goes into a function, as opposed to being trapped by what i find to be somewhat capricious behavior of React. Yes, the devil is in the details, Dr. JP.

## Running the app

App developed using react native (not expo) and android emulator only.

Assuming you have [react native and stuff](https://reactnative.dev/docs/environment-setup) set up already, in root folder run command `yarn` then `npm run android`
