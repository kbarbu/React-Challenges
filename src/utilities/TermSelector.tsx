import type { Dispatch, SetStateAction } from 'react';

const terms = ['Fall', 'Winter', 'Spring'];

interface TermSelectorProps {
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
    <div>
        {terms.map(term => (
            <label key={term}>
                <input type="radio" name="term" value={term} checked={term === selected} onChange={() => setSelected(term)}/>
                {term}
            </label>
        ))}
    </div>
);

export default TermSelector;
