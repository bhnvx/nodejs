var sayNode = function(){
    console.log('Node');
};

var es = 'ES';

var oldObject = {
    sayJS: function(){
        console.log('JS');
    },
    sayNode: sayNode,
};

oldObject[es+6] = 'Fantasrtic';

oldObject.sayJS();

oldObject.sayNode();
console.log(oldObject.ES6);