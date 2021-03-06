import React                                                                       from 'react';
import { Button, Col, Collapsible, CollapsibleItem, Icon, Pagination, Row, Table } from "react-materialize";
import PropTypes                                                                   from "prop-types";
import DishesEdit                                                                  from "./DishesEdit";
import Utils                                                                       from "../../utils/Utils";
import TextPropType                                                                from "../../utils/TextPropType";

class DishesList extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkCallback(this.props.onPageChange, "onPageChange");
        Utils.checkCallback(this.props.onDishCreate, "onDishCreate");
        Utils.checkCallback(this.props.onDishEdit, "onDishEdit");
        Utils.checkCallback(this.props.onDishDelete, "onDishDelete");
        this.onPageChange = this.onPageChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onPageChange(pageNumber) {
        this.props.onPageChange(pageNumber);
    }

    onSave(dish) {
        this.props.onDishEdit(dish);
    }

    onDelete(dish) {
        this.props.onDishDelete(dish);
    }

    isDishListExists() {
        return this.props.dishList && this.props.dishList.length > 0;
    }

    render() {
        return <div>
            <Collapsible accordion>
                { this.isDishListExists() ? (this.props.dishList.map(dish => {
                    const icon = dish.inCurrentUser ? <Icon right medium>favorite</Icon> : <Icon right medium>favorite_border</Icon>;
                    let likeButton = this.props.onDishSelect ? <a className="cyan pulse" onClick={ () => {
                        window.Materialize.toast(dish.name, 3000);
                        this.props.onDishSelect(dish.dishId);
                    } }>{ icon }</a> : null;
                    return <CollapsibleItem key={ dish.dishId } className="light-blue lighten-5" header={ <Table>
                        <tbody>
                        <tr>
                            <td className="left-align">{ dish.name }</td>
                            <td className="right-align">{ dish.energy.toFixed(2) }{ likeButton }</td>
                        </tr>
                        </tbody>
                    </Table>
                    }>
                        <Table hoverable responsive bordered className="light-blue lighten-3 z-depth-1">
                            <thead>
                            <tr>
                                <th data-field="name">{ this.props.text.dishes.tableHeadName }</th>
                                <th data-field="energy">{ this.props.text.dishes.tableHeadEnergy }</th>
                                <th data-field="amount">{ this.props.text.dishes.tableHeadAmount }</th>
                            </tr>
                            </thead>
                            <tbody>
                            { dish.products.map(product => {
                                return <tr key={ product.productId }>
                                    <td className="left-align">{ product.name }</td>
                                    <td>{ product.energy }</td>
                                    <td>{ product.amount }</td>
                                </tr>
                            }) }
                            </tbody>
                        </Table>
                        <Row/>
                        { this.props.editable ? (<Row className="right-align">
                            <Col s={ 6 }/>
                            <Col s={ 3 }>
                                <Button waves='yellow' className='red darken-4' onClick={ () => this.onDelete(dish) }>
                                    { this.props.text.dishes.buttonDelete }
                                </Button>
                            </Col>
                            <Col s={ 3 }>
                                <DishesEdit text={ this.props.text }
                                            isCreation={ true }
                                            onSave={ this.onSave }
                                            dish={ dish }
                                            modalTrigger={ <Button waves='green' className='green darken-2'>{ this.props.text.dishes.buttonEdit } </Button> }
                                />
                            </Col>
                        </Row>) : null }
                    </CollapsibleItem>
                })) : (null) }
            </Collapsible>
            <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.onPageChange }/>
        </div>
    }
}

DishesList.propTypes = {
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    editable: PropTypes.bool.isRequired,
    dishList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,

    onPageChange: PropTypes.func.isRequired,
    onDishEdit: PropTypes.func.isRequired,
    onDishDelete: PropTypes.func.isRequired,
    onDishCreate: PropTypes.func.isRequired,
    onDishSelect: PropTypes.func
};

export default DishesList;
