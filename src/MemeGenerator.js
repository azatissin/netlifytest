import React from 'react'

class MemeGenerator extends React.Component{

    state = {
            topText:"",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
    }
    

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs: memes})
                })
    } 
    
    handleChange = (event) => {
        const {name,value} = event.target
        this.setState({[name]:value}) 
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        this.setState({randomImg:this.state.allMemeImgs[randNum].url})
    }
    render(){
        return(
            <div>
                <form className="meme-form" onSubmit = {this.handleSubmit}>
                    <input 
                        type="text" 
                        value={this.state.topText} 
                        name="topText" 
                        placeholder="Top text"
                        onChange = {this.handleChange}
                    />                        
                    <br />
                    <input 
                        type="text" 
                        value={this.state.bottomText} 
                        name="bottomText" 
                        placeholder="Bottom text"
                        onChange = {this.handleChange}
                    />              
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator