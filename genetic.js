var GeneticAlgorithm = function () {};

GeneticAlgorithm.prototype.generate = function(length) {
  var chromosome='';
  for(var i=0;i<length;i++){
    chromosome+=Math.round(Math.random()).toString();
  }
  return chromosome;
};

GeneticAlgorithm.prototype.select = function(population, fitnesses,fitSum) {
  var level=Math.random()*fitSum;
  var sum=0;
  for(var i in fitnesses){
     sum+=fitnesses[i];
     if(sum>=level) return population[i];
  }
};

GeneticAlgorithm.prototype.mutate = function(chromosome, p) {
  for(var i in chromosome){
    if(Math.random()<p) chromosome[i]=1-chromosome[i];
  }
  return chromosome;
};

GeneticAlgorithm.prototype.crossover = function(chromosome1, chromosome2, p) {
    if(Math.random()<p){
       var p=Math.round(Math.random()*(chromosome1.length-1));
       var temp=chromosome2;
       chromosome2=chromosome2.substr(0,p)+chromosome1.substr(p);
       chromosome1=chromosome1.substr(0,p)+temp.substr(p);
    }
    return [chromosome1,chromosome2];
};

GeneticAlgorithm.prototype.run = function(fitness, length, p_c, p_m, iterations) {
  iterations=iterations||100;
  var population=[];
  var fitnesses=[];
  var number=240;
  var fitSum=0;

  for(var i=0;i<number;i++){
      population.push(this.generate(length));
      var fit=fitness(population[i]);
      fitnesses.push(fit);
      fitSum+=fit;
  }
  for(var times=0;times<iterations;times++){
    var population_new=[];
    for(var i=0;i<(number/2);i++){
      var chromosome1=this.select(population,fitnesses,fitSum);
      var chromosome2=this.select(population,fitnesses,fitSum);
      var pair=this.crossover(chromosome1,chromosome2,p_c);
      chromosome1=this.mutate(pair[0],p_m);
      chromosome2=this.mutate(pair[1],p_m);
      population_new.push(chromosome1);
      population_new.push(chromosome2);
     }
    population=population_new;
    fitnesses=[];
    fitSum=0;
    for(var i=0;i<number;i++){
      var fit=fitness(population[i]);
      fitnesses.push(fit);
      fitSum+=fit;
    }
  }
  var fittest=0;
  var p;
  for(var i in fitnesses){
    if(fitnesses[i]>fittest) {
      fittest=fitnesses[i];
      p=i;
    }
  };
  return population[p];
};
