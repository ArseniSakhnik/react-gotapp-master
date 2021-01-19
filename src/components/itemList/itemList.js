import React, {useState, useEffect, Component} from 'react';
import './itemList.css';
import Spinner from "../spinner";

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then(data => {
                updateList(data)
            })
    }, [])

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);

            return (
                <li
                    key={id}
                    className='list-group-item'
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </li>
            )
        })
    }

    if (!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList)

    return (
        <ul className='item-list list-group'>
            {items}
        </ul>
    )
}

export default ItemList;

// class ItemList extends Component {
//
//     constructor(props) {
//         super(props);
//     }
//
//     renderItems(arr) {
//         return arr.map((item) => {
//             const {id} = item;
//             const label = this.props.renderItem(item);
//
//             return (
//                 <li
//                     key={id}
//                     className='list-group-item'
//                     onClick={() => this.props.onItemSelected(id)}
//                 >
//                     {label}
//                 </li>
//             )
//         })
//     }
//
//     render() {
//         const {data} = this.props;
//         const items = this.renderItems(data);
//
//         return (
//             <ul className="item-list list-group">
//                 {items}
//             </ul>
//         );
//     }
// }
//
//
// const withData = (View) => {
//
//     return class extends Component {
//
//         state = {
//             data: null,
//         }
//
//         componentDidMount() {
//             const {getData} = this.props;
//
//             getData()
//                 .then((data) => this.setState({
//                     data
//                 }))
//         }
//
//         render() {
//             const {data} = this.state;
//
//             if (!data) {
//                 return <Spinner/>
//             }
//             return <View {...this.props} data={data}/>
//         }
//     }
// }
//
// export default withData(ItemList); //вынести эту функцию для массового использования