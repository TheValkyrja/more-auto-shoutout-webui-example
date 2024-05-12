const configContainer = document.getElementById('configContainer');
const addConfigBtn = document.getElementById('addConfigBtn');
const submitBtn = document.getElementById('submitBtn');
const configOutput = document.getElementById('configOutput');
const readFromJsonBtn = document.getElementById('readFromJson');
const copyBtn = document.getElementById('copyBtn');
const genConfigBtn = document.getElementById('genConfig!');

addConfigBtn.addEventListener('click', function () {
  const newConfig = document.createElement('details');

  addNewConfig(newConfig);

  const triggerOnSelect = newConfig.querySelector('#trigger_on');
  const addCheckCdtBtn = newConfig.querySelector('.addCheckCdtBtn');
  const subConfigContainer = newConfig.querySelector('.subConfigContainer');

  // 获取新添加的配置元素中的summary和name输入框
  const configSummary = newConfig.querySelector('summary');
  const nameInput = newConfig.querySelector('#name');

  configSummaryUpdateListener(configSummary, nameInput);
  triggerOnChangeListener(triggerOnSelect, newConfig);

  addCheckCdtListener(addCheckCdtBtn, subConfigContainer)
  configDeletionListener(newConfig);

});

submitBtn.addEventListener('click', genJson);

readFromJsonBtn.addEventListener('click', function () {
  const jsonString = document.getElementById('jsonInput').value;
  fillFormFromJson(jsonString);
  genJson();
});

copyBtn.addEventListener('click', copyConfigOutput);

genConfigBtn.addEventListener('click', genConfig);
