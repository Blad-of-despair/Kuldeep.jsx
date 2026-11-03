import React, { useState } from 'react';
import { HiX, HiColorSwatch } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themePresets } from '../../context/ThemeContext';
import styles from './ThemePicker.module.css';

const ThemePicker = ({ isOpen, onClose }) => {
  const { theme, changeTheme, setCustomTheme, customColors } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColors, setTempColors] = useState(
    customColors || {
      '--accent-primary': '#6366f1',
      '--accent-secondary': '#8b5cf6',
    }
  );

  const handlePresetClick = (presetKey) => {
    changeTheme(presetKey);
  };

  const handleColorChange = (variable, value) => {
    setTempColors(prev => ({ ...prev, [variable]: value }));
  };

  const applyCustomColors = () => {
    const baseTheme = theme === 'light' || theme === 'cherryBlossom' ? 'light' : 'dark';
    const fullColors = { ...themePresets[baseTheme], ...tempColors };
    setCustomTheme(fullColors);
    setShowColorPicker(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.picker}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Theme Customization</h2>
              <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
                <HiX />
              </button>
            </div>

            <div className={styles.content}>
              {!showColorPicker ? (
                <>
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Preset Themes</h3>
                    <div className={styles.presetGrid}>
                      {Object.entries(themePresets).map(([key, preset]) => (
                        <button
                          key={key}
                          className={`${styles.presetCard} ${theme === key ? styles.active : ''}`}
                          onClick={() => handlePresetClick(key)}
                        >
                          <div className={styles.presetPreview}>
                            <div
                              className={styles.colorBar}
                              style={{ background: preset['--gradient-main'] }}
                            />
                            <div className={styles.previewGrid}>
                              <span style={{ background: preset['--bg-primary'] }} />
                              <span style={{ background: preset['--bg-secondary'] }} />
                              <span style={{ background: preset['--accent-primary'] }} />
                              <span style={{ background: preset['--text-primary'] }} />
                            </div>
                          </div>
                          <span className={styles.presetName}>{preset.name}</span>
                          {theme === key && <div className={styles.checkmark}>✓</div>}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Custom Colors</h3>
                    <button
                      className={styles.customizeBtn}
                      onClick={() => setShowColorPicker(true)}
                    >
                      <HiColorSwatch />
                      Customize Accent Colors
                    </button>
                  </section>
                </>
              ) : (
                <section className={styles.section}>
                  <button
                    className={styles.backBtn}
                    onClick={() => setShowColorPicker(false)}
                  >
                    ← Back to Presets
                  </button>

                  <h3 className={styles.sectionTitle}>Custom Accent Colors</h3>
                  <p className={styles.description}>
                    Pick your primary and secondary accent colors to personalize the theme.
                  </p>

                  <div className={styles.colorInputs}>
                    <div className={styles.colorField}>
                      <label htmlFor="primary-color">Primary Accent</label>
                      <div className={styles.colorControl}>
                        <input
                          type="color"
                          id="primary-color"
                          value={tempColors['--accent-primary']}
                          onChange={(e) => handleColorChange('--accent-primary', e.target.value)}
                          className={styles.colorInput}
                        />
                        <input
                          type="text"
                          value={tempColors['--accent-primary']}
                          onChange={(e) => handleColorChange('--accent-primary', e.target.value)}
                          className={styles.colorText}
                          placeholder="#6366f1"
                        />
                      </div>
                    </div>

                    <div className={styles.colorField}>
                      <label htmlFor="secondary-color">Secondary Accent</label>
                      <div className={styles.colorControl}>
                        <input
                          type="color"
                          id="secondary-color"
                          value={tempColors['--accent-secondary']}
                          onChange={(e) => handleColorChange('--accent-secondary', e.target.value)}
                          className={styles.colorInput}
                        />
                        <input
                          type="text"
                          value={tempColors['--accent-secondary']}
                          onChange={(e) => handleColorChange('--accent-secondary', e.target.value)}
                          className={styles.colorText}
                          placeholder="#8b5cf6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.preview}>
                    <h4>Preview</h4>
                    <div className={styles.previewElements}>
                      <button
                        className={styles.previewBtn}
                        style={{
                          background: `linear-gradient(135deg, ${tempColors['--accent-primary']} 0%, ${tempColors['--accent-secondary']} 100%)`,
                        }}
                      >
                        Button Preview
                      </button>
                      <div
                        className={styles.previewBadge}
                        style={{ color: tempColors['--accent-primary'], borderColor: tempColors['--accent-primary'] }}
                      >
                        Badge
                      </div>
                    </div>
                  </div>

                  <button className={styles.applyBtn} onClick={applyCustomColors}>
                    Apply Custom Theme
                  </button>
                </section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemePicker;
