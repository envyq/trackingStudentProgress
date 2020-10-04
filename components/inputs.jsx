import { useState, useRef, useEffect } from 'react'
import cn from 'classnames'
import { nanoid } from 'nanoid'

import inputStyle from './inputs.module.sass'

export const SimpleInput = (props) => {

	const [ active, setActive ] = useState(props.defaultValue || props.value);

	const _props = Object.assign({}, props);
	delete _props.className;
	delete _props.label;
	delete _props.onChange;

	const onInput = (e) => {

		if(e.target.value !== "")
			setActive(true);
		else
			setActive(false);

		if(props.onChange) props.onChange(
			{ [e.target.name]: e.target.value }
		);
	}
	
	return (
		<div className={cn({
			[inputStyle.simpleInput]: true,  
			[props.className]: props.className,
			[inputStyle.active]: active,
			[inputStyle.errored]: !!props.error
		})}>
			{props.icon}
			<label>{props.label}</label>
			{props.rows ? (
				<textarea {..._props} onInput={onInput}></textarea>
			):(
				<input {..._props} onInput={onInput}/>
			)}
			{props.error && ( <div className={inputStyle.error}>{ props.error }</div> )}
		</div>
	);
}

export const SimpleButton = (props) => {

	const size = props.size || 100;

	const [ ripples, setRipples ] = useState([]);

	const ripplesRef = useRef();
	ripplesRef.current = ripples;

	useEffect(() => () => {								//Нам нужно сбросить эффект при размонтировании компонента
		for(let el of ripplesRef.current)
			clearTimeout(el.timeout);
	}, []);


	const onClick = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();

		const newRipple = {
			left: e.clientX - rect.left - size/2, top: e.clientY - rect.top - size/2, 
			id: nanoid(4), 
			size
		}

		newRipple.timeout = setTimeout(() => {
			if(ripplesRef.current.length > 1)
				setRipples(ripplesRef.current.slice(1));
			else
				setRipples([]);
		}, 1000);

		setRipples([...ripples, newRipple]);

	}

	const _props = Object.assign({}, props);
	delete _props.className;
	delete _props.children;

	return (
		<button className={cn(inputStyle.simpleButton, props.className)} onMouseDown={onClick} {..._props}>
			{props.children}
			{ripples.map((el) => (
				<div 
					className={inputStyle.ripple}
					style={{top: el.top, left: el.left, width: el.size+'px', height: el.size+'px'}} 
					key={el.id}
				></div>
			))}
		</button>
	)
}

export const SimpleDropDown = (props) => {
	const [ open, setOpen ] = useState(false);
	const openRef = useRef();
	openRef.current = open;

	const init = Array.isArray(props.options) ? (props.defaultValue  || 0) : (props.defaultValue || Object.keys(props.options)[0])
	const [ value, setValue ] = useState(init);

	const select = (e) => {
		setValue(e.target.getAttribute('data-key'));

		if(props.onChange)
			props.onChange({[props.name]: e.target.getAttribute('data-key')});
	}

	const _open = (e) => {
		setOpen(!openRef.current);
	}

	return (
		<div className={cn({
			[inputStyle.simpleInput]: true,  
			[props.className]: props.className,
			[inputStyle.active]: open,
			[inputStyle.dropDown]: true
		})} onClick={_open}>
			<label>{props.label}</label>
			<div className={inputStyle.dropDownContent}>{props.options[value]}</div>
			<MdKeyboardArrowUp  className={inputStyle.button}/>
			<ul className={cn('clear', inputStyle.dropDownOptions)}>
				{Array.isArray(props.options)?
					props.options.map((el, index) => (
						<li key={index}>
							<button onClick={select} data-key={index}>{el}</button>
						</li>
					)):
					Object.keys(props.options).map(key => (
						<li key={key}>
							<button onClick={select} data-key={key}>{props.options[key]}</button>
						</li>
					))}
			</ul>
			{props.error && ( <div className={inputStyle.error}>{ props.error }</div> )}
		</div>

	);
}

