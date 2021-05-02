// curring কোন concept না। এটি একটি pettern.
// Currying এই শব্দটি এসেছে একজন বিখ্যাত computer scientist "haskell curry" এর নাম অনুসারে। তিনি এই pettern টি তৈরি করেছেন। এটি মূলত code লিখার একটা ধরন।

// একটি উদাহরণঃ
function multiply(a, b, c){
    return a*b*c;
}
console.log(multiply(2, 3, 4))
// "haskell curry" যেটা বলেছেনঃ যখনই আমার কোন function এ miltiple parameter থাকবে, তখন সেই multiple parameter কে ভেঙ্গে ভেঙ্গে একটা একটা parameter এ convert করা যায় সেটাকেই বলা হবে "currying".
// এখন এই multiple parameter যুক্ত function টিকে single parameter function এ convert করি।
function curriedMultiply(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        }
    }
}
// console.log(curriedMultiply(2)(3)(4))
// এই function টিকে আরেকভাবেও call করা যায়ঃ
let step1 = curriedMultiply(2); // এটি main function. এই function টি আবার আরেকটি function return করে। এই function টিকে "Partial Function" বলা হয়।
let step2 = step1(3);
let step3 = step2(4);
console.log(step3);

// =====================================================
// এখন এর সুবিধাটা দেখবঃ 

function discount(price, disc){
    return price - price * disc;
}

let customer1Disc = discount(600, .1)
let customer2Disc = discount(700, .1)
let customer3Disc = discount(800, .1)
// এখানে customer এর discount calculate করবে। আমরা যদি "currying" ব্যাবহার না করি, তাহলে প্রত্যেকবার আমাকে কত পার্সেন্ট ডিসকাউন্ট দিব সেটি বার বার বলে দিতে হচ্ছে। যেখানে আমার ডিসকাউন্ত এর পরিমাণ একই থাকছে। এক্ষেত্রে "currying" ব্যাবহার এর সুবিধা অনেক।
// এখন এইটার "currying" version টি দেখা যাকঃ
function discount(disc) {
    return (price) => {
        return price - price * disc;
    }
}
let discountAmount = discount(.1); // এটি "Partial Function" // // এর মাধ্যমে কত % ডিসকাউন্ট দিবে, সেটি নেওয়া হল।
let discountAmount1 = discount(.2)
let customer1D = discountAmount(600); // এখানে পন্যের মূল্যটি নেওয়া হল।
let customer2D = discountAmount(600);
let customer3D = discountAmount(600);
let customer4D = discountAmount1(600);
console.log (customer3D);
console.log (customer4D);

// ====================================================
// এখন একটি function লিখব, যেটি normal function কে currying function রূপান্তর করবে।

function curry(func) {
    return function curried(...args) {
        if(args.length >= func.length){
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1)(2)(3));


// এটি হল আমাদের নিজেদের তৈরি করা function । আমরা যদি একটা lybrary ব্যাবহার করি, তাহলে আমাদেরকে এত বড় function লিখার প্রয়োজন হয়না। lybrary ব্যাবহার করে সেটিকে call করলেই হয়ে যায়। 

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = _.curry(sum); 
// lybrary ব্যাবহার করে "sum" function টিকে "curry" তে convert করা হল। এটি "lodash" lybrary এর "curry" function.
// এটার জন্য "lodash" lybrary টি ব্যাবহার করা বাধ্যতামুলক।
// lybrary CDN Link: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"

console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1)(2)(3));

//====================================================
// "curry" এর একটা crazy উদাহরণঃ 
// Log Function:
function log(date, importance, message){
    console.log(`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} : ${importance} : ${message}`)
}

let curriedLog = _.curry(log);
curriedLog(new Date(), "DEBUG", "Some Debug");
curriedLog(new Date())("DEBUG")("Some Debug");

let logNow = curriedLog(new Date());

logNow("Info") ("Info Message");

// ================================================
// ShortCut Curried Function
function multiply(a) {
    return (b) => {
        return (c) => {
            return a * b * c;
        }
    }
}

// Convert This function into arrow Function:
const multiply = (a) => (b) => (c) => a * b * c;
console.log(multiply(5)(6)(7))


