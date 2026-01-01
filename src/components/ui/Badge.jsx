export const Badge = ({ children, color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-100 text-blue-700',
        green: 'bg-green-100 text-green-700',
        purple: 'bg-purple-100 text-purple-700',
        amber: 'bg-amber-100 text-amber-700',
        red: 'bg-red-100 text-red-700'
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}>
            {children}
        </span>
    );
};
