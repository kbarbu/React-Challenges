export const COURSE_COLORS = [
    '#ea7a1a',
    '#7c5cd6',
    '#3b82d6',
    '#3f9f4f',
    '#d6498f',
    '#1a9a9a',
];

export const colorForIndex = (index: number) =>
    COURSE_COLORS[index % COURSE_COLORS.length];
