function generateRandomColors() {
    var keyword = document.getElementById('keyword').value

    // 알파벳이 아닌 문자가 있는지 확인
    if (!isValidKeyword(keyword)) {
        alert('Keyword should contain only alphabets!')
        return
    }

    var colorDisplay = document.getElementById('color-display')
    colorDisplay.innerHTML = ''

    var firstColor = generateColorWithVowelCount(keyword)
    var secondColor = generateSimilarColor(firstColor)
    var thirdColor = generateSimilarColor(firstColor)
    var fourthColor = generateDarkerColor(firstColor)
    var fifthColor = generateBrightComplementaryColor(firstColor)

    for (var i = 0; i < 5; i++) {
        var randomColor = i === 0 ? firstColor : i === 1 ? secondColor : i === 2 ? thirdColor : i === 3 ? fourthColor : fifthColor

        var colorBox = document.createElement('div')
        colorBox.className = 'color-box'
        colorBox.style.backgroundColor = randomColor
        colorDisplay.appendChild(colorBox)
    }
}

function generateColorWithVowelCount(keyword) {
    var vowelCount = countVowels(keyword)
    var hash = 0

    var combinedKey = keyword + new Date().getTime().toString()
    for (var i = 0; i < combinedKey.length; i++) {
        hash = combinedKey.charCodeAt(i) + ((hash << 5) - hash)
    }

    // 모음의 개수에 따라 R 값 조정
    var adjustedR = Math.min(255, 100 + vowelCount * 20)

    var color = `#${adjustedR.toString(16).padStart(2, '0')}`
    for (var j = 1; j < 3; j++) {
        var value = (hash >> (j * 8)) & 255
        color += value.toString(16).padStart(2, '0')
    }

    return color
}

function generateSimilarColor(baseColor) {
    var threshold = 20 // 기준 색상과의 차이 임계값

    // 기준 색상에서 랜덤하게 R, G, B 값을 조정
    var randomR = adjustComponent(parseInt(baseColor.substr(1, 2), 16))
    var randomG = adjustComponent(parseInt(baseColor.substr(3, 2), 16))
    var randomB = adjustComponent(parseInt(baseColor.substr(5, 2), 16))

    // 조정된 값으로 새로운 색상 생성
    var similarColor = `#${randomR.toString(16).padStart(2, '0')}${randomG.toString(16).padStart(2, '0')}${randomB.toString(16).padStart(2, '0')}`

    return similarColor

    function adjustComponent(component) {
        // 기준 색상의 컴포넌트 값을 랜덤하게 조정
        var randomAdjustment = Math.floor(Math.random() * (2 * threshold + 1)) - threshold
        return Math.max(0, Math.min(255, component + randomAdjustment))
    }
}

function generateDarkerColor(baseColor) {
    // 기준 색상보다 어두운 값을 생성
    var darkerR = Math.max(0, parseInt(baseColor.substr(1, 2), 16) - 50)
    var darkerG = Math.max(0, parseInt(baseColor.substr(3, 2), 16) - 50)
    var darkerB = Math.max(0, parseInt(baseColor.substr(5, 2), 16) - 50)

    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`
}

function generateBrightComplementaryColor(baseColor) {
    // 첫 번째 색상의 보색에 흰색에 가까운 밝은 색을 생성
    var invertedColor = invertColor(baseColor)
    var brightComplementaryColor = lightenColor(invertedColor, 70) // 70은 조절 가능한 밝기 정도입니다.

    return brightComplementaryColor
}

function invertColor(hex) {
    // 색상을 반전시킴
    return '#' + (0xFFFFFF ^ parseInt(hex.substr(1), 16)).toString(16).padStart(6, '0')
}

function lightenColor(hex, percent) {
    // 색상을 밝게 만듦
    var r = parseInt(hex.substr(1, 2), 16)
    var g = parseInt(hex.substr(3, 2), 16)
    var b = parseInt(hex.substr(5, 2), 16)

    r = Math.min(255, r + r * percent / 100)
    g = Math.min(255, g + g * percent / 100)
    b = Math.min(255, b + b * percent / 100)

    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`
}

function generateRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// 알파벳이 아닌 문자를 확인하는 함수
function isValidKeyword(keyword) {
    return /^[a-zA-Z]+$/.test(keyword)
}

// 모음의 개수를 세는 함수
function countVowels(str) {
    var vowelCount = 0
    var vowels = 'aeiouAEIOU'
    for (var i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            vowelCount++
        }
    }
    return vowelCount
}
