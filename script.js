//////////////////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTION
const form = document.querySelector('.form');
const btn = document.querySelector('.btn');
const inputEl = form.querySelector('.input');
const optionEl = form.querySelector('.option');
const resultEl = document.querySelector('.result');

const validationNumber = (arrNum) => {
  if (arrNum.some((el) => Number.isNaN(el))) {
    alert('Please input all numbers');
    return;
  }
};

const getData = (str) => str.split(',').map((el) => el * 1);

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
  return num > 1;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
// ADD EVENT LISTENER - CHOOSE FUNCTION
let optionValue, inputValue, input6Value;

optionEl.addEventListener('change', (e1) => {
  optionValue = e1.target.value * 1;

  if (optionValue === 6) {
    const markup = `<div class="input6-container">
            <p>Nhập 2 vị trí cần đổi, cách nhau bằng dấu phẩy</p>
            <input type="text" class="input6 p-2 mt-2 mb-6 border border-gray-500 rounded-md focus:outline-none">
        </div>`;
    form.insertAdjacentHTML('beforeend', markup);
    const input6El = form.querySelector('.input6');
    input6El.addEventListener('change', (e2) => (input6Value = getData(e2.target.value)));
  }

  if (optionValue !== 6) {
    const input6ElContainer = form.querySelector('.input6-container');
    if (input6ElContainer) input6ElContainer.remove();
  }
});

inputEl.addEventListener('change', (e) => (inputValue = getData(e.target.value)));

btn.addEventListener('click', (e) => {
  e.preventDefault();
  validationNumber(inputValue);

  const input = [...inputValue];
  const input6 = input6Value ? [...input6Value] : [];

  let result;

  switch (optionValue) {
    case 1:
      result = sumPositive(input);
      break;
    case 2:
      result = countPositive(input);
      break;
    case 3:
      result = findMin(input);
      break;
    case 4:
      result = findMinPositive(input);
      break;
    case 5:
      result = lastEven(input);
      break;
    case 6:
      result = swapNum(input, input6);
      break;
    case 7:
      result = sortAsc(input);
      break;
    case 8:
      result = findPrime(input);
      break;
    case 9:
      result = countInteger(input);
      break;
    case 10:
      result = compareNum(input);
      break;
    default:
      alert('Please choose a function');
      break;
  }

  resultEl.textContent = result;
});

// -1,5,6,-2

//////////////////////////////////////////////////////////////////////////////////////////////////////
// DETAIL FUNCTIONALITY

// 1.sumPositive
const sumPositive = (arr) => {
  return arr.filter((el) => el > 0).reduce((acc, el) => acc + el, 0);
};

// 2.countPositive
const countPositive = (arr) => arr.filter((el) => el > 0).length;

// 3.findMin
const findMin = (arr) => Math.min(...arr);

// 4.findMinPositive
const findMinPositive = (arr) => {
  const arrPositive = arr.filter((el) => el > 0);
  if (arrPositive.length === 0) return 'Mảng không có số dương';
  return Math.min(...arrPositive);
};

// 5.lastEven
const lastEven = (arr) => {
  const arrPositive = arr.filter((el) => el > 0);
  if (arrPositive.length === 0) return 'Mảng không có số dương';
  const arrEven = arrPositive.filter((el) => el % 2 === 0);
  if (arrEven.length === 0) return 'Mảng không có số chẵn';
  return arrEven.slice(-1);
};

// 6.swapNum
const swapNum = (arr1, arr2) => {
  validationNumber(arr2);

  const flag = arr1[arr2[0] - 1];
  arr1[arr2[0] - 1] = arr1[arr2[1] - 1];
  arr1[arr2[1] - 1] = flag;
  return arr1;
};

// 7.sortAsc
const sortAsc = (arr) => arr.sort((a, b) => a - b).join(',');

// 8.findPrime
const findPrime = (arr) => arr.find((el) => isPrime(el));

// 9.countInteger
const countInteger = (arr) => arr.filter((el) => Number.isInteger(el)).length;

// 10.compareNum
const compareNum = (arr) => {
  const positive = arr.filter((el) => el > 0).length;
  const negative = arr.filter((el) => el < 0).length;

  return positive > negative
    ? `Số lượng số dương (${positive}) lớn hơn số lượng số âm (${negative})`
    : positive < negative
    ? `Số lượng số dương (${positive}) nhỏ hơn số lượng số âm (${negative})`
    : `Số lượng số dương (${positive}) bằng số lượng số âm (${negative})`;
};
