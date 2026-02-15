import Dock from './Dock';
function Docker() {


  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Dashboard', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Ai', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Profile', onClick: () => alert('Settings!') },
  ];


  return (
    <Dock
      items={items}
      panelHeight={70}
      baseItemSize={50}
      magnification={70}
    />
  )
}

export default Docker