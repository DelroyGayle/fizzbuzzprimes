# Having Fun with Fizz Buzz

I came across this apparently common JavaScript interview puzzle regarding "FizzBuzz"

[FizzBuzz: One Simple Interview Question](https://www.youtube.com/watch?v=QPZ0pIK_wsc)

FizzBuzz is a game whereby two people count up in turn 1, 2, 3, 4, 5, ... saying the numbers.\
When one reaches a multiple of three, one says "Fizz" instead of the number;\
and when one reaches a multiple of five, one says "Buzz" instead of the number.\
Moreover, when it is a multiple of both i.e. 15, one says "FizzBuzz"

A gentleman by the name of [Imran Ghory](https://imranontech.com/2007/01/24/using-fizzbuzz-to-find-developers-who-grok-coding/) proposed that anyone going for a job in computer programming should be able to:

> **write a program that outputs the correct words according to "FizzBuzz" for the numbers 1 to 100.**

This generated some interesting results and essays - see the references for more information.

In my estimation, I managed to write a solution.

Being intrigued with FizzBuzz, I  wrote the following variations to "FizzBuzz":

## FizzBuzzV1
See [FizzBuzzV1](https://github.com/DelroyGayle/FizzBuzzV1) for further details.


## FizzBuzzV2 i.e. FizzBuzzPrimes

FizzBuzzPrimes is a React program which displays 100 buttons representing the range 1 to 100.\
Cyan buttons labelled "FizzBuzz" are shown for numbers that are multiples of 3 and 5\
i.e. multiples of 15

Orange buttons labelled 'Fizz' are shown for numbers that are multiples of 3\
Yellow buttons labelled 'Buzz' are shown for numbers that are multiples of 5

However odd prime numbers are given randomly coloured buttons with a random word ending with two identical letters

## References

[Using FizzBuzz to Find Developers who Grok Coding - January 24, 2007](https://imranontech.com/2007/01/24/using-fizzbuzz-to-find-developers-who-grok-coding/)

[Don't Overthink FizzBuzz - January 24, 2007](http://weblog.raganwald.com/2007/01/dont-overthink-fizzbuzz.html)

[Why Can't Programmers.. Program? - 26 Feb 2007](https://blog.codinghorror.com/why-cant-programmers-program/)

[FizzBuzz: the Programmer's Stairway to Heaven - 27 Feb 2007](https://blog.codinghorror.com/fizzbuzz-the-programmers-stairway-to-heaven/)

[10 Python solutions](https://github.com/joelgrus/fizzbuzz) from Joel Grus' book
[Ten Essays on Fizz Buzz](https://fizzbuzzbook.com).
Please enjoy them.

[Ten Essays on Fizz Buzz](https://fizzbuzzbook.com)
Meditations on Python, mathematics, science, engineering, and design

# Here are a couple of outputs from FizzBuzzPrimes

![image](https://user-images.githubusercontent.com/91061592/196045261-d9225105-b465-4951-bee0-7a5d7e2b34f9.png)

![image](https://user-images.githubusercontent.com/91061592/196045283-35611c06-912d-447c-858f-4a087ab8bb88.png)


## Datamuse API

### What is it?
The [Datamuse API](https://www.datamuse.com/api/) is a word-finding query engine for developers. You can use it in your apps to find words that match a given set of constraints and that are likely in a given context. You can specify a wide variety of constraints on meaning, spelling, sound, and vocabulary in your queries, in any combination.

### What is it good for?
Applications use the API for a wide range of features, including autocomplete on text input fields, search relevancy ranking, assistive writing apps, word games, and more. 

For this project, I used the following type of query
>**/words?sp=???zz**

### Here is a sample of queries:

>words related to duck that start with the letter b	
>>>/words?ml=duck&sp=b*

>words related to spoon that end with the letter a	
>>>/words?ml=spoon&sp=*a

>words that sound like jirraf	
>>>/words?sl=jirraf

>words that start with t, end in k, and have two letters in between	
>>>/words?sp=t??k

### Usage limits
You can use this service without restriction and without an API key for up to 100,000 requests per day. 

If you use the API within a publicly available app, kindly acknowledge the Datamuse API within your app's documentation.

For more details please look at the [documentation](https://www.datamuse.com/api/).