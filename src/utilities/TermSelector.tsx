import type { Dispatch, SetStateAction } from 'react';

const terms = ['Fall', 'Winter', 'Spring'];

interface TermSelectorProps {
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
    <div className="term-selector" role="group" aria-label="Term">
        {terms.map(term => (
            <button key={term}
                type="button"
                className="term-option"
                data-term={term.toLowerCase()}
                aria-pressed={term === selected}
                onClick={() => setSelected(term)}>
                {term}
            </button>
        ))}
    </div>
);

export default TermSelector;
