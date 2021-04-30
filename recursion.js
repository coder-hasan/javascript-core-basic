// অন্যান্য সকল programming language এর মত javascript ও "Recursion" support করে। আর javascript হওয়ার কারনে এটি একটু অন্তভাবে করে।
// যখন একটা function নিজেকে নিজের body এর ভিতরেই call করে তখন সেই ঘটনাকে recursion বলে।
let myFunc = function() {
    myFunc();
}
// এখানে function তার নিজের body এর ভিতরেই তাকে কল করেছে। যেহেতু "myFunc" টি global ভেরিয়েবল, তাই এটি child scope এও access নিতে পারবে। 
// use case:

let total = 0;
let n = 10;

for(let i = 1; i <= n; i++){
    total += i;
}
console.log(total);

// এখন এই উদাহরণটিকে function এ convert করে দেখিঃ 
// f(n-1) + n = f(n)
function sum(n) {
    if(n === 0){
        return 0;
    }else{
        return sum(n-1) + n;
    }
}
console.log(sum(3))

// এই পদ্ধতিটিকেই বলা হয় "Recursion"
