const lines = 5;
let result = '';
// Проверяется именно переменная result, формируйте строку в ней
for ( let i = 1; i < lines; i++){
  for ( let j = 0; j < lines - i; j++){
    result += ' ';
  }
  for (let j = 0; j < i; j++){
    result += '*';  
  }
  for (let k = 1 ; k < i; k++){
    result += '*';  
  }
  result += '\n';
}
console.log(result);