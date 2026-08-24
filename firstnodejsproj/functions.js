const ages = [12, 19, 25, 17, 30, 15];

// Filter out ages 18 and older
const adults = ages.filter(function(age) {
    return age >= 18;
});

console.log(adults); // [19, 25, 30]

