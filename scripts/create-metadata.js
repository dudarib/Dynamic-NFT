const DungeonsAndDragons = artifacts.require('DungeonsAndDragonsCharacter')
const fs = require('fs')

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "Strength",
            "value": 0
        },
        {
            "trait_type": "Speed",
            "value": 0
        },
        {
            "trait_type": "Stamina",
            "value": 0
        }
    ]
}
module.exports = async callback => {
    const dnd = await DungeonsAndDragons.deployed()
    length = await dnd.getNumberOfCharacters()
    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your character ' + index + ' of ' + length)
        let characterMetadata = metadataTemple
        let characterOverview = await dnd.characters(index)
        index++
        characterMetadata['name'] = characterOverview['name']
        if (fs.existsSync('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue
        }
        console.log(characterMetadata['name'])
        characterMetadata['attributes'][0]['value'] = characterOverview['strength']['words'][0]
        characterMetadata['attributes'][1]['value'] = characterOverview['speed']['words'][0]
        characterMetadata['attributes'][2]['value'] = characterOverview['stamina']['words'][0]
        filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(characterMetadata)
        fs.writeFileSync(filename + '.json', data)
    }
    callback(dnd)
}