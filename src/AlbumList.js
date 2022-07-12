import React from "react";
import AlbumForm from "./AlbumForm";
export default class AlbumList extends React.Component{
    state = {
        currentIndex: -1,
        list: this.returnList()
    }
    returnList() {
        if(localStorage.getItem('albums') == null)
            localStorage.setItem('albums',JSON.stringify([]))
        return JSON.parse(localStorage.getItem('albums'))
    }
    onAddOrEdit =(data) => {
        var list = this.returnList()
        if(this.state.currentIndex==-1)
        list.push(data)
        else
        list[this.state.currentIndex] = data
        localStorage.setItem('albums',JSON.stringify(list))
        this.setState({list, currentIndex: -1})
    }
    handleEdit = index => {
        this.setState({
            currentIndex: index
        })
    }
    handleDelete = index => {
        var list = this.returnList()
        list.splice(index, 1)
        localStorage.setItem('albums',JSON.stringify(list))
        this.setState({list, currentIndex: -1})
    }
    render() {
        return(
            <div>
                <AlbumForm
                onAddOrEdit={this.onAddOrEdit}
                currentIndex={this.state.currentIndex}
                list = {this.state.list}
                />
                <hr/>
                <table>
                    <tbody>
                        {
                            this.state.list.map((item,index) => {
                                return <tr key={index}>
                                    <td>{item.albumName}</td>
                                    <td>{item.artistName}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.releaseYear}</td>
                                    <td><button onClick={() => this.handleEdit(index)}>Edit</button></td>
                                    <td><button onClick={() => this.handleDelete(index)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}