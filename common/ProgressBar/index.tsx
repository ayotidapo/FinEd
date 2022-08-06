const Progressbar = () => {
  return (
    <div style={{ display: 'flex' }}>
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
            width: '25%',
          }}
        />
      </div>
      <span>15% complete</span>
    </div>
  );
};

export default Progressbar;
