function sortWrapper(sortFn, arr) {
    return new Promise(function(resolve, reject) {
        let intermediates=[];
        function cb(results) {
            if (sortFn.name==='quickSort') {
                console.log(sortFn.name, results,'function resolved')
            }
            var endTime=performance.now(); 
            var algoTime=endTime-startTime;
            console.log(sortFn.name, algoTime);
            resolve(results); 
        }
        var startTime=performance.now();
        if (sortFn.name==='quickSort') {
            sortFn.apply(null, [arr.slice(), intermediates, cb, 0, arr.length-1]);
        } else {
            sortFn.apply(null, [arr.slice(), intermediates, cb]); 
        }
    });
}

function binaryInsertionSort(arr, intermediates, cb) {
    if (!arr) { return new Error('No array supplied to sort.'); }
    else if (arr.length<=1) { return new Error('Array length is not sortable.'); }
    var j=0;
    for (var i=1;i<arr.length;i++) {
      let key=arr[i];
      j=i-1;
      let idx=binarySearch(arr, key, 0, j)
      while (j>=idx) {
        arr[j+1]=arr[j];
        j--;
      }
      arr[j+1]=key;
      intermediates.push(arr.slice());
    }
    intermediates.push(arr.slice());
    return cb(intermediates);
  }
  
  function binarySearch(arr, target, L = null, R = null, ct = 0) {
    if (!arr || arr.length <= 1 || !target) {
      return new Error("Too few arguments supplied.");
    }
    if (typeof arr[0] !== typeof target) {
      return new Error("Type mismatch between array elements and target.");
    }
    if (!Array.isArray(arr)) {
      return new Error("Can only search over an array.");
    }
    ct++;
    if (ct === arr.length-1) { //prevent infinite recursion for unsorted array
      return new Error("Infinite loop prevented.");
    }
    let midPt = Math.floor((L + R) / 2);
    if (L>=R) { return (target > arr[L]) ? L+1 : L; }
    if (target===arr[midPt]) { return midPt+1; }
    if (arr[midPt]>target) {
      R=midPt-1
      return binarySearch(arr, target, L, R, ct);
    } else if (arr[midPt]<target) {
      L=midPt+1;
      return binarySearch(arr, target, L, R, ct);
    }
  }

function quickSort(arr, intermediates, cb, left, right) {
    if (left<right) {
        let pivot=partition(arr, left, right);
        console.log(pivot);
        intermediates.push(arr.slice());
        quickSort(arr, intermediates, cb, left, pivot-1);
        quickSort(arr, intermediates, cb, pivot+1, right);
    }
    else { return cb(intermediates); }
  }
  
  function partition(arr, left, right) {
    const swap = (a, b) => {
      let temp=arr[a];
      arr[a]=arr[b];
      arr[b]=temp;
    };
    let mid = Math.floor((right+left)/2);
    let pivot = arr[mid];
    swap(mid, left);
    let i = left+1;
    let j = right;
    while (i<=j) {
      while (i<=j && arr[i] <= pivot) { i++; }
      while (i<=j && arr[j] > pivot) { j--; }
      if (i < j) { swap(i, j); }
    }
    swap(i-1, left);
    return i-1;
   }

function insertionSort(arr, intermediates, cb) {
    if (!arr) { return new Error('No array supplied to sort.'); }
    else if (arr.length<=1) { return new Error('Array length is not sortable.'); }
    var j=0;
    for (var i=1;i<arr.length;i++) {
      let key=arr[i];
      j=i-1;
      while (j>=0 && arr[j]>key) {
        arr[j+1]=arr[j];
        j--;
      }
      arr[j+1]=key;
      intermediates.push(arr.slice());
    }
    intermediates.push(arr.slice());
    return cb(intermediates);
  }

function bubbleSort(arr, intermediates, cb) {
    let swapped=false;
    const swapIndices = (a,b) => {
      let temp=arr[a];
      arr[a]=arr[b];
      arr[b]=temp;
    };
    for (var i=1;i<arr.length;i++) {
      if (arr[i]<arr[i-1]) {
        swapped=true;
        swapIndices(i-1,i);
      }
      intermediates.push(arr.slice(0))
    }
    return swapped ? bubbleSort(arr, intermediates, cb) : cb(intermediates);
}

function selectionSort(arr, intermediates, cb) {
  const swap = (arr, a, b) => {
    temp=arr[a];
    arr[a]=arr[b];
    arr[b]=temp;
    return true;
  }
  if (!arr) { return new Error('No array supplied to sort.'); }
  else if (arr.length<=1) { return new Error('Array length is not sortable.'); }
  let newArr=[];
  for (var i=0;i<arr.length;i++) {
    var min=arr[i], minIdx=i;
    for (var j=i+1;j<arr.length;j++) {
      if (arr[j]<min) {
        min=arr[j];
        minIdx=j;
      }
    }
    if (min!==arr[i]) { 
      intermediates.push(arr.slice())
      swap(arr, i, minIdx);
    }
    intermediates.push(arr.slice(0))
  }
  intermediates.push(arr.slice()); //final state
  return cb(intermediates);
}

const randomArray = (n) => new Array(n).fill(0).map(e=>Math.floor(Math.random()*500+1));
const completeUnsorted = (n) => {
    let arr=[];
    for (var i=n;i>0;i--) { arr.push(i); }
    return arr;
}
const camelBack = (n) => {
    let arr=[];
    for (var i=n-5;i>0;i--) { arr.push(i); }
    for (var i=n-5;i<n;i++) { arr.push(i); }
    return arr;
}
const camelFront = (n) => {
    let arr=[];
    for (var i=0;i<5;i++) { arr.push(n-i); }
    for (var i=5;i<n;i++) { arr.push(i); }
    return arr;
}
const oneAway = (n) => {
    let arr=[];
    let randomIdx=Math.floor(Math.random()*n-1);
    for (var i=0;i<n;i++) {
        i===randomIdx ? arr.push(Math.floor(Math.random()*i)) : arr.push(i);
    }
    return arr;
}

function createGraph(id, width, height, padding) {
  if ((!id||!width)||!height) { throw new Error('Graph missing required parameters'); }
  var margin = {top: padding, right: padding, bottom: padding, left: padding};
  width-=(margin.left+margin.right);
  height-=(margin.top+margin.bottom);
  var div = document.createElement('div');
  div.id=id;
  div.classList.add('graphBox');
  let BOX=document.querySelector('div.sortBox');
  var caption = document.createElement('span');
  caption.id=id;
  caption.innerHTML=id;
  caption.classList.add('graphCaption');
  div.appendChild(caption);
  BOX.appendChild(div);
  var svg = d3.select(`div#${id}`).append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id", id).append("g");
  return {
    id: id,
    svg: svg,
    margin: margin,
    height: height,
    width: width,
    rate: 100,
    animating: false,
    setData: function(data) { 
        this.data=data;
        this.update(data[0]);
    },
    init: function(init) { 
        this.update(init); 
        console.log(this.data);
    },
    setName: function(name) { 
        this.name=name; 
        this.showName();
    },
    showName: function() {
        var caption = document.querySelector(`span#${this.id}`);
        caption.innerHTML=this.name;
        console.log(this.name,'sn')
    },
    update: function(data) {
      var x = d3.scaleBand().range([0, width])
      var y = d3.scaleLinear().range([height, 0]);
      x.domain(data.map(function(d,i) { return i; }));
      y.domain([0, d3.max(data, function(d) { return d; })]);
      var barWidth = Math.floor((width-padding)/data.length);
      var bars = svg.selectAll(".bar").remove().exit().data(data);
      bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d,i) { return i*barWidth+margin.left; })
        .attr("width", barWidth-1)
        .attr("y", function(d,i) { return y(d); })
        .attr("height", function(d) { return height-y(d); });
    },
    handler: function(interval) { this.interval=interval; },
    animate: function(rate) {
      if (rate) { this.rate=rate; }
      if (this.animating) { return false; }
      var i=1;
      this.update(this.data[i]);
      this.animating=true;
      (function(data, update, complete, rate, handler) {
            var interval=d3.interval(()=>{
                i++;
                i%=data.length;
                if (i!==0) { update(data[i]); }
                else { 
                    interval.stop();
                    complete();
                }
            }, rate);
            handler(interval);
        }
        )(this.data, this.update, this.animationDone.bind(this), this.rate, this.handler.bind(this));
    },
    animationDone: function() { 
        this.animating=false;
        this.svg.selectAll(".bar").attr("class", "finished")
    },
    stopAnimation: function() {
        this.interval.stop();
        this.animating=false;
    },
    reset: function(id) {
        d3.selectAll(`svg#${this.id} g rect`).remove();
        d3.select(`div#${id}`).selectAll(".bar").remove().exit();
    },
    reAnimate: function(rate) {
        if (!this.animating) {
            if (rate) { this.rate=rate; }
            this.animating=false;
            this.animate(rate);
        }
       }
    }
}

function listenUp() {
    document.querySelectorAll('button.graphType').forEach(b=>{
        b.addEventListener('click', switchGraph);
    });
}

function switchGraph(e) {
    const numElements=70;
    switch (e.target.id) {
        case 'max': graphEm(completeUnsorted(numElements)); break;
        case 'oneOff': graphEm(oneAway(numElements)); break;
        case 'cBack': graphEm(camelBack(numElements)); break;
        case 'cFront': graphEm(camelFront(numElements)); break;
        case 'random': graphEm(randomArray(numElements)); break;
        default: break;
    }
}

let G={};

function graphEm(arr, speed=5) {
    console.log(G)
    let sortFns=[insertionSort, binaryInsertionSort, selectionSort, bubbleSort, quickSort];
    let promises=sortFns.map(fn=>sortWrapper(fn, arr));
    console.log(promises);
    Promise.all(promises).then(data=>{
        data.forEach((run,idx)=>{
            console.log(run);
        let key='graph_'+idx;
        if (!G[key]) {
            G[key]=new createGraph(key, 400, 100, 10);
            let H=G[key];
            H.setName(sortFns[idx].name);
            H.setData(run);
            H.init(arr);
            H.animate(speed);
        } else {
            let H=G[key];
            H.stopAnimation();
            H.reset();
            H.setData(run);
            H.init(arr);
            H.animate(10);
            }
        });
    });
}

window.onload = function() {
    listenUp();
    const arr=completeUnsorted(5);
    graphEm(arr);
}