const usualErrors = {
    never(stackinfo) {
        return {
            statusCode: 500,
            message: 'Should never arrive there, please report this response to support.',
            where: JSON.stringify(stackinfo).match(/(\d+:\d+)/)[0]
        }
    }
}

export default usualErrors
