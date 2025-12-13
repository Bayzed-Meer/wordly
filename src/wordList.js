export const wordList = {
    4: [
        'ABLE', 'ACID', 'AGED', 'ALSO', 'AREA', 'ARMY', 'AWAY', 'BABY', 'BACK', 'BALL',
        'BAND', 'BANK', 'BASE', 'BATH', 'BEAR', 'BEAT', 'BEEN', 'BEER', 'BELL', 'BELT',
        'BEST', 'BILL', 'BIRD', 'BLOW', 'BLUE', 'BOAT', 'BODY', 'BOMB', 'BOND', 'BONE',
        'BOOK', 'BOOM', 'BORN', 'BOSS', 'BOTH', 'BOWL', 'BULK', 'BURN', 'BUSH', 'BUSY',
        'CALL', 'CALM', 'CAME', 'CAMP', 'CARD', 'CARE', 'CASE', 'CASH', 'CAST', 'CELL',
        'CHAT', 'CHIP', 'CITY', 'CLUB', 'COAL', 'COAT', 'CODE', 'COLD', 'COME', 'COOK',
        'COOL', 'COPE', 'COPY', 'CORE', 'COST', 'CREW', 'CROP', 'DARK', 'DATA', 'DATE',
        'DAWN', 'DAYS', 'DEAD', 'DEAL', 'DEAN', 'DEAR', 'DEBT', 'DEEP', 'DENY', 'DESK'
    ],
    5: [
        'APPLE', 'BADGE', 'CABIN', 'DANCE', 'EAGLE', 'FAITH', 'GRACE', 'HAPPY', 'IMAGE', 'JOKER',
        'KNIFE', 'LEMON', 'MAGIC', 'NOBLE', 'OCEAN', 'PEACE', 'QUEEN', 'RIVER', 'STONE', 'TIGER',
        'UNITY', 'VOICE', 'WHALE', 'XENON', 'YOUTH', 'ZEBRA', 'BEACH', 'CHARM', 'DREAM', 'FLAME',
        'GLOBE', 'HEART', 'IVORY', 'JEWEL', 'KARMA', 'LIGHT', 'MEDAL', 'NEXUS', 'OASIS', 'PEARL',
        'QUEST', 'ROYAL', 'SMILE', 'TRUST', 'URBAN', 'VITAL', 'WIELD', 'YIELD', 'ZONAL', 'AGILE',
        'BRAVE', 'CRAFT', 'DRIFT', 'EARTH', 'FROST', 'GIANT', 'HAVEN', 'INPUT', 'JOLLY', 'KNACK',
        'BLAZE', 'CRISP', 'DENSE', 'EMPTY', 'FRUIT', 'GRAND', 'HONOR', 'IDEAL', 'JOINT', 'LOCAL',
        'MINOR', 'NORTH', 'OUTER', 'PRIDE', 'QUICK', 'ROUND', 'SHARP', 'THICK', 'TRADE', 'TRAIN'
    ],
    6: [
        'ACCEPT', 'ACCESS', 'ACROSS', 'ACTION', 'ACTIVE', 'ACTUAL', 'ADVICE', 'ADVISE', 'AFFECT', 'AFFORD',
        'AGENCY', 'AGENDA', 'ALMOST', 'ALWAYS', 'AMOUNT', 'ANIMAL', 'ANNUAL', 'ANSWER', 'ANYONE', 'ANYWAY',
        'APPEAL', 'APPEAR', 'AROUND', 'ARRIVE', 'ARTIST', 'ASPECT', 'ASSESS', 'ASSIST', 'ASSUME', 'ATTACH',
        'ATTACK', 'ATTEMPT', 'ATTEND', 'AUTHOR', 'AUTUMN', 'AVENUE', 'BACKED', 'BACKUP', 'BALLET', 'BANKER',
        'BATTLE', 'BEAUTY', 'BEFORE', 'BEHALF', 'BEHAVE', 'BEHIND', 'BELIEF', 'BELONG', 'BENEFIT', 'BESIDE',
        'BETTER', 'BEYOND', 'BISHOP', 'BORDER', 'BOTTLE', 'BOTTOM', 'BOUGHT', 'BRANCH', 'BREAST', 'BREATH',
        'BRIDGE', 'BRIGHT', 'BROKEN', 'BUDGET', 'BURDEN', 'BUREAU', 'BUTTON', 'CAMERA', 'CANCEL', 'CANCER'
    ],
    7: [
        'ABILITY', 'ABSENCE', 'ACADEMY', 'ACCOUNT', 'ACCUSED', 'ACHIEVE', 'ACQUIRE', 'ADDRESS', 'ADVANCE', 'ADVERSE',
        'ADVISED', 'ADVISER', 'ADVOCATE', 'AGAINST', 'AIRCRAFT', 'AIRPORT', 'ALCOHOL', 'ALLIANCE', 'ALREADY', 'ANALYSIS',
        'ANCIENT', 'ANOTHER', 'ANXIOUS', 'ANYWHERE', 'APPARENT', 'APPLIED', 'APPOINT', 'APPROACH', 'APPROVE', 'ARRANGE',
        'ARTICLE', 'ASSEMBLY', 'ATTEMPT', 'ATTRACT', 'AUCTION', 'AVERAGE', 'BALANCE', 'BANKING', 'BARRIER', 'BATTERY',
        'BEARING', 'BECAUSE', 'BEDROOM', 'BENEFIT', 'BENEATH', 'BESIDES', 'BETWEEN', 'BINDING', 'BIOLOGY', 'BLANKET',
        'BROTHER', 'BROUGHT', 'BUILDER', 'BURNING', 'CABINET', 'CALIBER', 'CAPABLE', 'CAPITAL', 'CAPTAIN', 'CAPTURE',
        'CAREFUL', 'CARRIER', 'CATALOG', 'CEILING', 'CENTRAL', 'CENTURY', 'CERTAIN', 'CHAMBER', 'CHANNEL', 'CHAPTER'
    ]
};

export function getRandomWord(wordLength) {
    const availableWords = wordList[wordLength] || wordList[5];
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}

