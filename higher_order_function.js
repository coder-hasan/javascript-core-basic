// Javascript এ function কে first class citizen বলা হয়। কারণ javascript এ function ই হল Object. javascript এ function হল একটা special type of Object.

// javascript এ কোন function কে variable এ assign করা যায়। function কে আরেকটা function এর parameter হিসেবে পাঠানো যায়। এবং function কে আরেকটা function থেকে return ও করা যায়।

// Higher Order Function:
// এটি এমন একটা function যেটা অন্য function এর উপর কাজ করে। সেটা হতে পারে অন্য function কে parameter হিসেবে নিয়ে, অথবা অন্য function কে return করে দিয়ে, অথবা দুইটাই হতে পারে।

function hello() {
        return function() {
        console.log(`Hello World!!`)
    }
}
hello()();
// hello() এটি একটি higher-order function. যেহেতু এই function টি অন্য একটি function কে return করছে।


//===========================================================
// higher-order function এর কিছু উদাহরণঃ
// Example 1 without higher-order Function:
var numbers = [1, 2, 3];
var result = [];
for(i=0; i < numbers.length; i++){
    result.push(numbers[i] * 2);
}
console.log(result);


// Example 1 with higher-order Function:
var numbers = [1, 2, 3];
var result = numbers.map((number) => number * 2); // arrow Function
console.log(result)


// =================================
// Example 2 without higher-order Function:
var players = [
    {
        name: 'Sakib',
        avg: 38.23,
    },
    {
        name: 'Tamim',
        avg: 36.74,
    },
    {
        name: 'Mushfiq',
        avg: 36.89,
    },
    {
        name: 'Mahmudullah',
        avg: 37.25
    }
];
var palyersOverThirtySeven = [];
for(let i = 0; i < players.length; i++){
    if(players[i].avg>= 37){
        palyersOverThirtySeven.push(players[i])
    }
}
console.log(palyersOverThirtySeven);


// Example 2 with higher-order Function:
var players = [
    {
        name: 'Sakib',
        avg: 38.23,
    },
    {
        name: 'Tamim',
        avg: 36.74,
    },
    {
        name: 'Mushfiq',
        avg: 36.89,
    },
    {
        name: 'Mahmudullah',
        avg: 37.25
    }
];

var palyersOverThirtySeven = players.filter((player) => player.avg>= 37);
console.log(palyersOverThirtySeven);


// ==========================================================
// Example 3 Our Own Higher-Order Function(array.map()) :
const language = ["javascript", "Python", "PHP", "C", "C++"];
function mapMahmud(arr, fn){
    const newArray = [];
    for(let i=0; i<arr.length; i++){
        newArray.push(fn(arr[i]))
    }
    return newArray;
}

const myArray = mapMahmud(language, function(language){
    return language.length;
});

console.log(myArray);
