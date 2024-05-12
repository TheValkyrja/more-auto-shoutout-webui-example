function configSummaryUpdateListener(configSummary, nameInput) {
    // 当name输入框内容改变时，同步更新summary的内容
    nameInput.addEventListener('input', function () {
        updateConfigName(configSummary, nameInput);
    });
}

function configDeletionListener(newConfig) {
    const deleteConfigBtn = newConfig.querySelector('.deleteConfigBtn');
    deleteConfigBtn.addEventListener('click', function () {
        newConfig.remove();
    });
}

function triggerOnChangeListener(triggerOnSelect, newConfig) {
    triggerOnSelect.addEventListener('change', function () {
        triggerOnCtrl(triggerOnSelect, newConfig);
    });
}

function checkCdtDeletionListener(newCheckCdt) {
    const deleteCheckCdtBtn = newCheckCdt.querySelector('.deleteCheckCdtBtn');
    deleteCheckCdtBtn.addEventListener('click', function () {
        newCheckCdt.remove();
    });
}

function checkCdtChangeListener(checkSelect, newCheckCdt) {
    checkSelect.addEventListener('change', function () {
        checkCdtCtrl(checkSelect, newCheckCdt);
    });
}

function addCheckCdtListener(addCheckCdtBtn, subConfigContainer) {
    addCheckCdtBtn.addEventListener('click', function () {
        addNewCheckCdt(subConfigContainer);
    });
}

function copyConfigOutput() {
    var configOutput = document.getElementById('configOutput');
    configOutput.select();
    document.execCommand('copy');

    var copyBtn = document.getElementById('copyBtn');
    copyBtn.innerText = '已复制！';
    setTimeout(function () {
        copyBtn.innerText = '点击复制..';
    }, 2000);
}