// Improvements - things that need to know about unescapeHTML don't necessariily
// need to know about availableDifficulties

const Constants = {
    availableDifficults : ["Easy", "Medium", "Hard"],
    // Generated Method - Why doesn't this exist natively???
    unescapeHTML: (text) =>(text || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
}

export default Constants;