const xStyle = {
  display: 'inline-block',
  width: '25%',
  fontSize: '1.2rem',
  fontFamily: 'Helvetica Neue Regular, sans-serif',
  marginLeft: '1rem',
};

const Progressbar = ({ progress }: { progress: number }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          height: '4px',
          borderRadius: '10px',
          background: '#E3EEE7',
          width: '100%',
        }}
      >
        <div
          style={{
            background: '#015351',
            borderRadius: '10px',
            height: '100%',
            width: `${progress}%`,
          }}
        />
      </div>
      <span style={xStyle}>{progress}% complete</span>
    </div>
  );
};

export default Progressbar;
