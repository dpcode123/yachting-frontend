export default class YachtCommand {
    modelName: string
    shipyardId: number
    lengthOverallMeters: number
    beamMeters: number
    imageYoutubeId: string

    constructor() { 
        this.modelName = ''
        this.shipyardId = 0
        this.lengthOverallMeters = 0
        this.beamMeters = 0
        this.imageYoutubeId = ''
    }
}
