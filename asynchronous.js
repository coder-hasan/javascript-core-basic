// Asynchronous
const processorder = (customer) => {
    console.log(`Processing Order From Customer 1`);

    var currentTime = new Date().getTime();
    while(currentTime + 3000 >= new Date().getTime());

    console.log(`Ordedr Processing from Customer 1`)
}

console.log(`Take Order From Customer 1`);
processorder();
console.log(`Complete Order From Customer 1`);

// এখানে function এর ভিতরে ৩সেকেন্ড ধরে একটি লুপ চলার কারনে এখানে সম্পুর্ণ process বন্ধ ছিল। এই ধরনের অবস্থায় পড়লে browser তার সম্পুর্ণ engine টিকেই বন্ধ করে দেয়।

const processorder = (customer) => {
    console.log(`Processing Order From Customer 1`);

    setTimeout(() => {
        // // এই function টি javascript এর build-in function । এটিকে বলা হয় Asynchronous Function. 
        // // এটিও ৩সেকেন্ড অপেক্ষা করবে। তবে এটি আগের লুপ এর মত সনপুর্ণ process কে বন্ধ করে দিবে না। browser যখন এই function টি পাবে, তখন browser সাথে সাথেই এটিকে "web API" তে transfer করে দিবে। এটা বাদ দিয়ে পরের code গুলো ঠিকমত run করবে। 
        // // এটির ৩সেকেন্ড সেষ হোওয়ার পর web Api থেকে এই function টিকে callback queue তে transfer করা হয়। সেখান থেকে event loop এর মাধ্যমে এই function টি call stack এ এসে পৌঁছায়। তারপর এই function টি run হয়।
        console.log(`Cooking Complete`);
    }, 3000);

    console.log(`Ordedr Processing from Customer 1`)
}

console.log(`Take Order From Customer 1`);
processorder();
console.log(`Complete Order From Customer 1`);

// =======================================================
// এখন দেখব call back function দিয়ে asynchronous code গুলাকে আরো কিভাবে সুন্দর করা যায়। 

const takeOrder = (customer, callback) => {
    console.log(`Take Order From ${customer}`);
    callback(customer)
}
const processOrder = (customer, callback) => {
    console.log(`Processing Order From ${customer}`);

    setTimeout(() => {
        console.log(`Cooking Complete`);
        console.log(`Ordedr Processed for ${customer}`);
        callback(customer);
    }, 3000);
}

const completeOrder = (customer) => {
    console.log(`Complete Order For ${customer}`);
}

takeOrder("customer 1", (customer) => {
    processOrder(customer, (customer) => {
        completeOrder(customer);
    });
});
// এখানে যেভাবে callback function ব্যাবহার করা হয়েছে, এর কারনে takeOrder call করার সময় সেটি অনেক বড় হয়ে যাচ্ছে। এখানে nested callback ব্যাবহার হয়েছে। এটাকে callback hell. large কোন application এর ক্ষেত্রে এই ধরনের callback আমাদের জন্য readable হয়না। এটাকে দূর করার জন্য অন্য আরেকটি process এ আমরা code টি লিখতে পারি।


// =========================================================
// Avoide Callback hell with promise:
// promise কে আমরা "new Promise()" দিয়ে declare করতে পারি। সেটি একটি callback function receive করে। সেই callback function টি আবার দুইটা function receive করে।  একটি হল "resolve" আরেকটি হল "reject"

hasMeeting = false;
const meeting = new Promise((resolve, reject) => {
    if(!hasMeeting) {
        const meetingDetails = {
            name: 'Technical Meeting',
            location: 'Google Meet',
            time: '10:00 PM'
        };
        resolve(meetingDetails);
    }else{
        reject(new Error(`Meeting Already Scheduled!`));
    }
});

// Promise কে ব্যাবহার করতে হলে আমরা দুইটা জিনিসকে chain করব। একটা হল promise.then() আরেকটি হল promise.catch(). ".then()" ভিতরে পাব resolve data. আর ".catch()" এর ভিতর পাব reject data.


// const addToCalender = (meetingDetails) => {
//     return new Promise((resolve, reject) => {
//         const calender = `${meetingDetails.name} has been scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
//         resolve(calender)
//     });
// }
// // এই function টিতে আমাদের "reject" এর কোন প্রয়োজন নেই। সেজন্য আমরা এটিকে আরো ছোট করতে পারিঃ

const addToCalender = (meetingDetails) => {
    const calender = `${meetingDetails.name} has been scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
    return Promise.resolve(calender);
}

meeting
    .then(addToCalender)
    .then((res) => {
        console.log(JSON.stringify(res));
    })
    .catch((err) => {
        console.log(err.message)
    })

// ==============================================================
// Multiple Promise & Get Multiple Result

const promise1 = Promise.resolve(`Promise 1 Resolved.`);

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`Promise 2 Resolved`);
    }, 2000);
});

promise1.then(res => console.log(res));
promise2.then(res => console.log(res));

// এই দুইটা "promise" একসাথে run করাতে চাইলে "promise.all" দিয়ে করতে হবে। 
// এখানে দেখা যাবে দুইটি "promise" এর result একসাথে print হবে। মানে দুই সেকেন্ড পর দুইটা promise ই প্রিন্ট হবে।
Promise.all([promise1, promise2]).then(res => {
        console.log(res);
    });

// promise এর আরেকটি property হল "race". এটি দিয়েও সকল promise কে call করা যায়। তবে এখানে সকল promise এর result দেখাবে না। যেই promise টির কাজ তাড়াতাড়ি শেষ হবে শুধুমাত্র সেই promise এর result print করবে।
Promise.race([promise1, promise2]).then(res => {
    console.log(res);
});

// ============================================
// larger application এর ক্ষেত্রে এভাবে একটার পর একটা ".then()" ব্যাবহার করলে সেটিও আমাদের readable করতে কষ্ট হয়ে যাবে। 
// সেটার জন্য আমরা "asynchronous" কাজগুলো line by line "synchronous" way তে লিখতে পারি।

function friendlyFunction() {
    return `Hello World`;
}
console.log(friendlyFunction);
// এটি একটি "asynchronous" function. এই function টিকে আমরা "synchronous" function এ রূপান্তর করতে পারি। 

function friendlyFunction() {
    return Promise.resolve(`Hello World`);
}
console.log(friendlyFunction)
// আগের function টিতে শুধুমাত্র string print হয়েছিল। কিন্তু এখানে "Promise" print হয়েছে।


// শুধু function এর আগে "async" যুক্ত করে দিলেই সেই function টি asynchronous function হয়ে যাবে।

async function friendlyFunction() {
    return `Hello World`;
}
console.log(friendlyFunction());


// =================================================
// solve that meeting Promise by await Function;

hasMeeting = true;
const meeting = new Promise((resolve, reject) => {
    if(!hasMeeting) {
        const meetingDetails = {
            name: 'Technical Meeting',
            location: 'Google Meet',
            time: '10:00 PM'
        };
        resolve(meetingDetails);
    }else{
        reject(new Error(`Meeting Already Scheduled!`));
    }
});

const addToCalender = (meetingDetails) => {
    const calender = `${meetingDetails.name} has been scheduled on ${meetingDetails.location} at ${meetingDetails.time}`;
    return Promise.resolve(calender);
}

// // "Error" handeling এর জন্য আমাদেরকে "async" function এর ভিতরে try{} ব্যাবহার করতে হবে।
async function myMeeting() {
    try{
        const meetingDetails = await meeting;
        const calender = await addToCalender(meetingDetails);
        console.log(calender);
    }catch{
        console.log(`Something wrong Happend`);
    }
}
myMeeting();


