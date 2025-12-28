import { useEffect, useRef, useState } from 'react';

function Search(): React.JSX.Element {
	const inputRef = useRef<HTMLInputElement>( null );
	const [ show, setShow ] = useState<boolean>( false );

	const onSearchSubmit = ( event: React.FormEvent<HTMLInputElement> ) => {
		event.preventDefault();
		const query = inputRef.current?.value;
		if ( ! query ) {
			getAllRows().forEach( clearHighlight );
			return;
		}

		const rows = getAllRows();
		let isFirst = false;
		rows.forEach( row => {
			const text = row.textContent;
			if ( ! text ) {
				clearHighlight( row );
				return;
			}
			const pos = text.toLowerCase().search( query.toLowerCase() );
			if ( pos !== -1 ) {
				row.classList.add( `checklist-table__row--highlight` );
				if ( !isFirst ) {
					isFirst = true;
					row.classList.add( `checklist-table__row--highlight--first` );
				}
				row.scrollIntoView( { behavior: `smooth`, block: `center` } );
			} else {
				clearHighlight( row );
			}
		} );
	};

	useEffect( () => {
		const handleKeyDown = ( event: KeyboardEvent ) => {
			if ( ( event.ctrlKey || event.metaKey ) && event.key === `f` ) {
				event.preventDefault();
				setShow( true );
				inputRef.current?.focus();
			} else if ( event.key === `Escape` ) {
                inputRef.current!.value = ``;
                getAllRows().forEach( clearHighlight );
                inputRef.current?.blur();
                setShow( false );
			}
		};

		window.addEventListener( `keydown`, handleKeyDown );
		return () => window.removeEventListener( `keydown`, handleKeyDown );
	} );

	const classList = [ `search__container` ];
	if ( ! show ) {
		classList.push( `search__container--hidden` );
	}

	return <div className={ classList.join( ` ` ) }>
		<input
			ref={ inputRef }
			type="search"
			className="search__input"
			placeholder="Search..."
			onChange={ onSearchSubmit }
		/>
	</div>;
}

function clearHighlight( row: Element ): void {
	row.classList.remove( `checklist-table__row--highlight--first` );
	row.classList.remove( `checklist-table__row--highlight` );
}

function getAllRows(): NodeListOf<Element> {
	return document.querySelectorAll( `.checklist-table__row` );
}

export default Search;
