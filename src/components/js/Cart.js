import React from 'react';
import { Link } from 'react-router-dom';
import getCurrencySymbol from '../../assets/currencies';
import mainClasses from '../../MainCss/MainClasses.module.css';
import { getAttr, getFirstNameAndLastName, getPrice } from '../../__helpers__/product';
import classes1 from '../css/Cart1.module.css';
import classes2 from '../css/Cart2.module.css';
import CareesoulHOC from './CaresoulHOC';
/* eslint-disable */
export default class CartPreview extends React.Component {
	constructor(props) {
		super(props);
		if (this.props.type === 'page') this.classes = classes2;
		else this.classes = classes1;
		this.renderProduct = this.renderProduct.bind(this);
		this.renderAttr = this.renderAttr.bind(this);
		this.renderAttributeItem = this.renderAttributeItem.bind(this);
		this.handleControl = this.handleControl.bind(this);
		this.handleSelectAttr = this.handleSelectAttr.bind(this);
		this.renderImage = this.renderImage.bind(this);

		this.state = {
			selected: 0,
		};
	}

	handleControl(type, id) {
		return () => this.props.cartControl(type, id)();
	}
	handleSelectAttr(attrName, item, productId) {
		return () => {
			this.props.selectAttr(attrName, item, productId);
		};
	}

	renderAttributeItem(name, type, selectedId, productId) {
		return (item) => {
			try {
				switch (type) {
					case 'text':
						return (
							<div key={item.value + Math.random() * 1000} onClick={this.handleSelectAttr(name, item, productId)} accessKey="cart_control" className={`${mainClasses.container} ${mainClasses.center} ${this.classes.attritem} ${item.id === selectedId ? this.classes.selected : ''}`}>
								<p accessKey="cart_control">{item.value}</p>
							</div>
						);
					case 'swatch':
						return <div key={item.value + Math.random() * 1000} accessKey="cart_control" className={`${mainClasses.container} ${mainClasses.center} ${this.classes.attritem} ${item.id === selectedId ? this.classes.colorselected : ''}`} style={{ backgroundColor: item.value }} />;
					default:
						return;
				}
			} catch (err) {}
		};
	}
	renderAttr(selectedProduct, productId) {
		return (attr) => {
			const { name, type, items } = attr;
			const selectedId = getAttr(name, selectedProduct);
			return (
				<div key={name + Math.random() * 1000} className={`${mainClasses.container} ${mainClasses.row} ${this.classes.attrroot} ${mainClasses.justify_start}`}>
					<div className={`${this.classes.attrname} ${mainClasses.container} ${mainClasses.row} ${mainClasses.center}`}>
						<p>{attr.name}</p>
					</div>
					<div className={`${mainClasses.container} ${mainClasses.ml_1} ${mainClasses.row} ${this.classes.attritemsroot} ${mainClasses.center}`}>{items.map(this.renderAttributeItem(name, type, selectedId, productId))}</div>
				</div>
			);
		};
	}

	renderImage(img) {
		return (
			<div key={Math.random() * 1000} className={`${mainClasses.container} ${mainClasses.column} ${mainClasses.items_center} ${this.classes.imgroot}`} style={{height : "100%"}}>
				<img alt="product" src={img} className={this.classes.img}/>
			</div>
		);
	}

	renderProduct(product) {
		const { name, prices, qty, gallery, attributes, selectedProduct, id, brand } = product;
		const [firstName, restOfName] = getFirstNameAndLastName(name);
		const price = getPrice(prices, this.props.currency);
		return (
			<div key={product.id + Math.random() * 1000} className={`${mainClasses.container} ${mainClasses.column} ${this.classes.productroot}`}>
				<div className={`${mainClasses.container} ${mainClasses.row} ${this.classes.product2root} ${mainClasses.space_between}`}>
					<div className={`${mainClasses.display_block} ${mainClasses.col_5} ${this.classes.productdesc}`}>
						<div className={`${this.props.type === 'page' ? `${mainClasses.container} ${mainClasses.row} ${mainClasses.items_center}` : mainClasses.block} ${this.classes.names}`}>
							<div className={`${this.props.type === "page" ?  `${mainClasses.container} ${mainClasses.column} ${mainClasses.justify_center} ${mainClasses.items_center}` : "" } `}>
								<h4 className={`${this.classes.firstname}`}>{firstName}</h4>
							</div>
							<div className={`${this.props.type === "page" ?  `${mainClasses.container} ${mainClasses.column} ${mainClasses.justify_center} ${mainClasses.items_center}` : "" }`}  >{restOfName ? <p className={`${this.classes.restofname}`}>{restOfName}</p> : ''}</div>
							<div className={`${this.props.type === "page" ?  `${mainClasses.container} ${mainClasses.column} ${mainClasses.justify_center} ${mainClasses.items_center}` : "" } ${this.classes.brand}`}>
								<p>{brand}</p>
							</div>
						</div>
						<div className={`${this.classes.priceroot}`}>
							<h5>
								{getCurrencySymbol(price?.currency)}
								{String(price?.amount).slice(0, 7)}
							</h5>
						</div>
						{this.props.type === 'page' ? (
							<div className={`${mainClasses.container} ${mainClasses.column}  ${this.classes.mainroot}`}>
								<div className={`${this.classes.attrsroot} ${mainClasses.display_block} ${mainClasses.center} `}>{attributes.map(this.renderAttr(selectedProduct, id))}</div>
							</div>
						) : (
							''
						)}
					</div>

					<div className={`${mainClasses.container} ${mainClasses.row} ${mainClasses.col_7} ${mainClasses.end}`}>
						<div className={`${mainClasses.container} ${mainClasses.column} ${this.classes.controlroot} ${this.props.type === 'page' ? mainClasses.space_between : mainClasses.space_around}`} style={{ height: '100%' }}>
							<div className={`${mainClasses.container} ${mainClasses.column} ${mainClasses.center}`}>
								<button accessKey="cart_control" className={`${this.classes.controlbutton} ${mainClasses.container} ${mainClasses.column} ${mainClasses.center}`} onClick={this.handleControl('add', id)}>
									<p accessKey="cart_control">+</p>
								</button>
							</div>

							<div className={`${mainClasses.container} ${mainClasses.column} ${mainClasses.center} ${mainClasses.justify_center} ${mainClasses.items_center}`}>
								<p className={this.classes.qtyitem}>{qty}</p>
							</div>
							<div className={`${mainClasses.container} ${mainClasses.column}`}>
								<button accessKey="cart_control" className={`${this.classes.controlbutton} ${mainClasses.container} ${mainClasses.center}`} onClick={this.handleControl('remove', id)}>
									<p accessKey="cart_control">-</p>
								</button>
							</div>
						</div>
						<div className={`${mainClasses.container} ${mainClasses.column} ${mainClasses.items_center}`} style={{height : "100%"}}>
							{this.props.type === 'page' ? (
								<CareesoulHOC components={gallery.map(this.renderImage)} />
							) : (
								<div className={`${mainClasses.container} ${mainClasses.column} ${this.classes.imgroot} ${mainClasses.col_12}`}>
									<img alt="product" src={gallery[0]} className={this.classes.img} style={{ height: 'auto', width: '100%' }} />
								</div>
							)}
						</div>
					</div>
				</div>
				{this.props.type === 'page' ? (
					''
				) : (
					<div className={`${mainClasses.container} ${mainClasses.column}  ${this.classes.mainroot}`}>
						<div className={`${this.classes.attrsroot} ${mainClasses.display_block} ${mainClasses.center} `}>{attributes.map(this.renderAttr(selectedProduct, id))}</div>
					</div>
				)}
			</div>
		);
	}

	render() {
		const { products, price } = this.props.cart;
		return (
			<div className={`${mainClasses.container} ${mainClasses.column} ${this.classes.root} ${this.props.type !== 'page' ? `${mainClasses.mh_10} ${mainClasses.overflow_auto}` : ''}`}>
				{this.props.type === 'page' ? (
					<div className={this.classes.header}>
						<h3>Cart</h3>
					</div>
				) : (
					''
				)}
				<div className={`${this.classes.qtyroot} ${mainClasses.container} ${mainClasses.row} ${mainClasses.space_around} ${this.classes.headerroot}`}>
					<p className={this.classes.mybag}>My Bag</p>
					<p className={this.classes.qty}>{products.length} items</p>
				</div>
				{products.map(this.renderProduct)}
				<div className={`${mainClasses.container} ${mainClasses.row} ${mainClasses.space_evenly} ${this.classes.totalpriceroot}`}>
					<p className={this.classes.total}>Total : </p>
					<p className={this.classes.totalprice}>
						{getCurrencySymbol(this.props.currency)}
						{' ' + String(price).slice(0, 8)}
					</p>
				</div>
				<div className={`${mainClasses.container} ${mainClasses.row} ${mainClasses.space_evenly} ${this.classes.maincontrol}`}>
					{this.props.type === 'page' ? (
						''
					) : (
						<Link to="/cart">
							<button className={this.classes.viewbag}>View Bag</button>
						</Link>
					)}
					<button className={this.classes.checkout}>Checkout</button>
				</div>
			</div>
		);
	}
}
