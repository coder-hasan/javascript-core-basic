// hoisting কি?
// ============================================================
console.log(a);
// এখন এটি একটি error দেখাবে। 'a' is not defined.
// কিন্তু আমরা যদি console.log() এর পর a এর value set করি তাহলে এটি undefined দেখাবে।
var a ; // এটি হল variable declaration.
a = 'Bangladesh';
// এটি hoisting এর জন্য হচ্ছে। javascript যখন run করে, তখন (javascript Engine) সকল ভেরিয়েবল declaration কে সে টেনে উপরে তুলে নিয়ে যায়। মানে console.log() এর উপরে। hoisting এর অর্থকে আমরা এভাবে কল্পনা করতে পারি।
// javascript যখন দেখবে যে var keyword দিয়ে কোন কিছু declare করা হয়েছে। যদি সেটির value না পায়, তখন javascript সেই ভেরিয়াবল এ by-default undefined set (এটি অনেকটা input tag এর placeholder এর মত) করে দেয়। 


// =======================================================================
// এখন একটু অন্যভাবে দেখা যাক। 
// var আর let কখনই এক জিনিস নয়। যদি let দিয়ে value declare করি তখন কি হয়।
console.log(a); 
let a; // a = undefined;
a = "Bangladesh";
// এখানে এটি reference error দেখাচ্ছে। এখানে কোন undefined দেখাচ্ছে না। এখানেও hoisting হচ্ছে। কিন্তু একটু ভিন্নভাবে। এখানেও var এর মত let কে console.log() এর উপরে নিয়ে যাচ্ছে, কিন্তু যেই undefined set করার কথা ছিল সেটি করে না। var এর মত তাৎক্ষনিক undefined set হয়ে যায় না। let যেই লাইন এ assign হয়েছে সেই লাইন এ undefined set করে। যেহেতু সেই লাইন এর আগেই console.log() রয়েছে, সেজন্য এখানে error দেখাচ্ছে।
let a; // a = undefined;
console.log(a);
// এখানে এটি undefined দেখাচ্ছে। এর কারণ হল যেই লাইনে let declare করা হয়েছে, সেই লাইনেই undefined set হচ্ছে।
// এটিই হল var এবং let এর মধ্য hoisting এর পার্থক্য।


// =========================================================
// একটু complex Example:
var LANGUAGE = "Java";
var language = "Javascript"

function getLanguage(){
    // var language = "Javascript";
    if(!language){
        var language = LANGUAGE;
    }
    return language;
}
console.log(`I Love ${getLanguage()}`)
// এখানে কিন্তু আমরা unpredictable output পাব। এর কারণ হল "if" scope এর ভিতরের ভেরিয়েবলটি "var" দিয়ে declare করা। "hoisting" scope আকারে চলে। আমরা জানি hoisting এর কারনে "var" দিয়ে declare করা ভেরিয়েবলগুলোর মান না পেলে আগেই declare করে "undefined" set করে দেয়। এখানে "if" যেই লাইনে রয়েছে সেখানে "if" এর ভিতরের ভেরিয়েবলটি "if" এর আগেই declare হয়ে "undefined". সেজন্য এখানে "if" scope এর ভিতরে প্রবেশ করেছে।


// ===============================================
// Hoisting in Function:
myFunc()
function myFunc() {
    console.log(`I Love Javascript.`)
}
// এখানে দেখা যাচ্ছে যে, function টি সুন্দরমতই run করছে কোন error ছাড়াই। javascript engine যখন run করে hoisting এর কারনে, তখন "var" ভেরিয়েবল এর মতই function এর definetion কে function call এর উপরে নিয়ে যায়। সেজন্য এখানে function call এর পরে definetion থাকা সত্ত্বেও এটি পরিপুর্ণভাভে run হচ্ছে।

// আরেকটি উদাহরণঃ
function myFunc() {
    language = "Javascript";
    var language;
    console.log(language);
}
myFunc();
// এই উদাহরণ এ function এর ভিতরে "var" দিয়ে "language" কে define করার পরেও সেই "Javascript" ই output এ দিচ্ছে। এর কারণ hoisting. "function" scope এর ভিতরে যত ভেরিয়েবল রয়েছে, সবগুলাকে javascript Engine run করার সময় scope এর শুরুতে নিয়ে যায়। "var language" টি তখন ২য় লাইনে থাকে না। সেটি তখন ১ম লাইনে চলে যায়।

// অন্যরকম function এর উদাহরণঃ
myFunc()
const myFunc = function(){
    let language = "Javascript";
    console.log(language);
}
// এখানে কিন্তু ReferenceError দিচ্ছে। এখানেও hoisting কাজ করেছে। এখানে function এর মধ্য একটু পার্থক্য থাকার কারনে এরকম হয়েছে। এখানে function কে সরাসরি define করা হয়নি। function এর definetion কে একটি ভেরিয়েবল এ রাখা হয়েছে। তাই এখানে সে function এর মত কাজ করছে না। এখানে সে ভেরিয়েবল এর মত কাজ করছে। ভেরিয়েবল declare "const myFunc;" টিকে function call এর উপরে ঠিকই নিয়ে যাচ্ছে, কিন্তু এটার value undefined set হচ্ছে পরে। যেই লাইনে ভেরিয়েবলটি লিখা হয়েছে সেখানে।


// এখন প্রশ্ন হল আসলেই কি javascript এভাবে ভেরিয়রবলগুলাকে উপরে তুলে নিয়ে যায়?
// উত্তরঃ না। javascript আমাদের browser এ run করে দুইটা step এ। 
// 1. Compile step. 
// 2. Execution step.
// Compile step এ javascript সম্পুর্ণ code টিকে নেয়। নেওয়ার পর সে যেখানে যেখানে ভেরিয়েবল declaration দেখবে সেই সেই ভেরিয়েবলগুলাকে সে memory তে allocate করবে। "var" এর ক্ষেত্রে একটা default value instantly "undefined" দিয়ে দিবে। আর let এবং const এর ক্ষেত্রে যেই লাইনে declare করা হয়েছে সেই লাইনে "undefined" set করে দিবে। সেই লাইনের আগে যদি let এবং const এর ভেরিয়েবলকে access নিয়ে চাই তাহলে referenceError দেখাবে। আর function এর ক্ষেত্রে function declaration কেও memory তে allocate করবে।