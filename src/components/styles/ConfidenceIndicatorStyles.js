export const confidenceContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    width: '100%',
};

export const confidenceHeaderStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
};

export const confidenceLabelStyles = {
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#4A5565',
};

export const confidenceValueStyles = {
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#0A0A0A',
};

export const progressBarContainerStyles = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(3, 2, 19, 0.2)',
    borderRadius: '999px',
    overflow: 'hidden',
};

export const progressBarFillStyles = (percentage) => ({
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: '#030213',
    borderRadius: '999px',
    transition: 'width 0.3s ease',
});
