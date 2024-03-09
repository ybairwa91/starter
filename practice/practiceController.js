exports.getRequest = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'u successfully got the data'
    })
}
exports.createHttpRequest = (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'successPost',
        message: 'you successful in creating a data'
    })
}
exports.getRequestWithId = (req, res) => {
    console.log(req.params);
    if (req.params.id > 10) {

        res.status(400).json({
            status: 'failed',
            message: 'this is out of range'

        })
    }
    else
        res.status(200).json({
            status: 'success',
            message: 'this is what u want'
        })
}

exports.updateRequest = (req, res) => {
    if (req.params.id * 1 > 50) {
        return res.status(404).json({
            status: 'fail',
            message: "invalid id"
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...></updated>'
        }
    })

}

exports.deleteRequest = (req, res) => {
    res.status(500).json({
        status: "",
        message: 'this is delete request'
    })
}
