import React from "react";

export default class AlbumForm extends React.Component{

    state = {
        ...this.returnStateObject()  
    }
    
    returnStateObject(){
        if(this.props.currentIndex == -1)
            return {
                albumName : '', 
                artistName: '', 
                genre: '', 
                releaseYear: ''
            }
        else 
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentIndex != this.props.currentIndex || prevProps.list.length != this.props.list.length)
            this.setState({...this.returnStateObject()})
    }
    
    //binds the onChange event with the name attribute to match the state value we put into the form 
    handleInputChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onAddOrEdit(this.state);
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="albumName" 
                    placeholder="Album Name" 
                    value={this.state.albumName} 
                    onChange={this.handleInputChange}></input>

                    <input name="artistName" 
                    placeholder="Artist Name" 
                    value={this.state.artistName} 
                    onChange={this.handleInputChange}></input>

                    <input name="genre" 
                    placeholder="Genre" 
                    value={this.state.genre} 
                    onChange={this.handleInputChange}></input>

                    <input name="releaseYear" 
                    placeholder="Release Year" 
                    value={this.state.releaseYear} 
                    onChange={this.handleInputChange}></input>

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}