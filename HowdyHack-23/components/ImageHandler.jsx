import React from 'react';

class ImageHandler extends React.Component {
    state = {
        file: ""
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:8000", {
            file: this.state.file
        }).then((res) => {
            this.setState({
                file: ""
            });
        }).catch((err) => {});
    }
    render() {
        return (
            <div id="image-upload">
                <form onSubmit={this.handleSubmit}>
                    <div id="prompt">
                        <p>Upload image here:</p>
                        <input type="file"></input>
                        <input type="Submit">Submit</input>
                    </div>
                </form>
            </div>
        )
    }
}

export default ImageHandler