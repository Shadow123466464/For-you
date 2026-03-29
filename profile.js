var ProfileManager = {
    profile: null,
    avatarConfig: {
        gender: 'girl',
        animalType: 'cat',
        furColor: 'orange',
        outfitStyle: 'casual',
        outfitColor: 'pink',
        glasses: 'none',
        headAccessory: 'none',
        cheekStyle: 'none'
    },
    themeColor: '#ff6b81',

    init: function() {
        var self = this;
        self.loadProfile();
        self.setupEventListeners();
    },

    loadProfile: function() {
        var self = this;
        var saved = localStorage.getItem('userProfile');
        if (saved) {
            self.profile = JSON.parse(saved);
            if (self.profile.avatar) {
                self.avatarConfig = {
                    gender: self.profile.avatar.gender || 'girl',
                    animalType: self.profile.avatar.animalType || 'cat',
                    furColor: self.profile.avatar.furColor || 'orange',
                    outfitStyle: self.profile.avatar.outfitStyle || 'casual',
                    outfitColor: self.profile.avatar.outfitColor || 'pink',
                    glasses: self.profile.avatar.glasses || 'none',
                    headAccessory: self.profile.avatar.headAccessory || 'none',
                    cheekStyle: self.profile.avatar.cheekStyle || 'none'
                };
            }
            if (self.profile.themeColor) {
                self.themeColor = self.profile.themeColor;
                self.applyThemeColor(self.themeColor);
            }
            self.syncStreak();
            self.showMainContent();
            self.updateProfileDisplay();
        } else {
            self.showSetupOverlay();
        }
    },

    syncStreak: function() {
        var self = this;
        var streak = 0;
        
        var wordleStreak = localStorage.getItem('wordleStreak');
        if (wordleStreak) {
            streak = parseInt(wordleStreak) || 0;
        }
        
        var dailyStreak = localStorage.getItem('dailyStreak');
        if (dailyStreak) {
            var parsedDaily = parseInt(dailyStreak) || 0;
            if (parsedDaily > streak) {
                streak = parsedDaily;
            }
        }
        
        var streakData = localStorage.getItem('streak');
        if (streakData) {
            var parsedStreak = parseInt(streakData) || 0;
            if (parsedStreak > streak) {
                streak = parsedStreak;
            }
        }
        
        var wordleData = localStorage.getItem('wordleData');
        if (wordleData) {
            try {
                var parsed = JSON.parse(wordleData);
                if (parsed.streak && parsed.streak > streak) {
                    streak = parsed.streak;
                }
                if (parsed.currentStreak && parsed.currentStreak > streak) {
                    streak = parsed.currentStreak;
                }
            } catch(e) {}
        }
        
        var gameStats = localStorage.getItem('gameStats');
        if (gameStats) {
            try {
                var parsed = JSON.parse(gameStats);
                if (parsed.streak && parsed.streak > streak) {
                    streak = parsed.streak;
                }
                if (parsed.currentStreak && parsed.currentStreak > streak) {
                    streak = parsed.currentStreak;
                }
            } catch(e) {}
        }
        
        if (self.profile && self.profile.stats) {
            if (self.profile.stats.streak && self.profile.stats.streak > streak) {
                streak = self.profile.stats.streak;
            }
            self.profile.stats.streak = streak;
        }
        
        return streak;
    },

    getStreak: function() {
        var self = this;
        return self.syncStreak();
    },

    setStreak: function(value) {
        var self = this;
        if (self.profile && self.profile.stats) {
            self.profile.stats.streak = value;
            self.saveProfile();
        }
        localStorage.setItem('wordleStreak', value.toString());
        localStorage.setItem('streak', value.toString());
    },

    incrementStreak: function() {
        var self = this;
        var currentStreak = self.getStreak();
        self.setStreak(currentStreak + 1);
        self.updateProfileDisplay();
    },

    resetStreak: function() {
        var self = this;
        self.setStreak(0);
        self.updateProfileDisplay();
    },

    saveProfile: function() {
        var self = this;
        var currentStreak = self.getStreak();
        
        var profile = {
            firstName: self.profile ? self.profile.firstName || '' : '',
            lastName: self.profile ? self.profile.lastName || '' : '',
            avatar: {
                gender: self.avatarConfig.gender,
                animalType: self.avatarConfig.animalType,
                furColor: self.avatarConfig.furColor,
                outfitStyle: self.avatarConfig.outfitStyle,
                outfitColor: self.avatarConfig.outfitColor,
                glasses: self.avatarConfig.glasses,
                headAccessory: self.avatarConfig.headAccessory,
                cheekStyle: self.avatarConfig.cheekStyle
            },
            themeColor: self.themeColor,
            stats: {
                streak: currentStreak,
                lettersOpened: self.profile && self.profile.stats ? self.profile.stats.lettersOpened || 0 : 0,
                wordlesPlayed: self.profile && self.profile.stats ? self.profile.stats.wordlesPlayed || 0 : 0,
                memberSince: self.profile && self.profile.stats && self.profile.stats.memberSince ? self.profile.stats.memberSince : new Date().toISOString()
            }
        };
        self.profile = profile;
        localStorage.setItem('userProfile', JSON.stringify(profile));
    },

    showSetupOverlay: function() {
        var self = this;
        var overlay = document.getElementById('profileSetupOverlay');
        var mainContent = document.getElementById('mainContent');
        if (overlay) overlay.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'none';
        self.renderSetupAvatar();
        self.updateGenderOptions(self.avatarConfig.gender);
    },

    hideSetupOverlay: function() {
        var overlay = document.getElementById('profileSetupOverlay');
        var mainContent = document.getElementById('mainContent');
        if (overlay) overlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
    },

    showMainContent: function() {
        var overlay = document.getElementById('profileSetupOverlay');
        var mainContent = document.getElementById('mainContent');
        if (overlay) overlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
    },

    renderSetupAvatar: function() {
        var self = this;
        var previewIds = [
            'setupAvatarPreview',
            'setupAvatarPreview2',
            'setupAvatarPreview3',
            'setupAvatarPreview4',
            'setupAvatarPreviewFinal'
        ];
        previewIds.forEach(function(id) {
            if (document.getElementById(id)) {
                renderAvatar(id, self.avatarConfig, 'normal', true);
            }
        });
    },

    updateProfileDisplay: function() {
        var self = this;
        var nameEl = document.getElementById('profileName');
        var streakEl = document.getElementById('profileStreak');
        var avatarContainer = document.getElementById('profileAvatarSmall');

        if (nameEl && self.profile) {
            nameEl.textContent = self.profile.firstName || 'User';
        }
        
        var currentStreak = self.getStreak();
        if (streakEl) {
            if (currentStreak === 1) {
                streakEl.textContent = '🔥 ' + currentStreak + ' day streak';
            } else {
                streakEl.textContent = '🔥 ' + currentStreak + ' days streak';
            }
        }
        
        if (avatarContainer) {
            renderAvatar('profileAvatarSmall', self.avatarConfig, 'mini', true);
        }
    },

    goToStep: function(stepNumber) {
        var self = this;
        document.querySelectorAll('.setup-step').forEach(function(step) {
            step.classList.remove('active');
        });
        var targetStep = document.getElementById('step' + stepNumber);
        if (targetStep) {
            targetStep.classList.add('active');
            self.renderSetupAvatar();
        }
    },

    updateGenderOptions: function(gender) {
        var self = this;
        self.avatarConfig.gender = gender;

        var headAccessoryOptions = document.getElementById('headAccessoryOptions');
        if (headAccessoryOptions) {
            headAccessoryOptions.querySelectorAll('.option-card[data-gender]').forEach(function(card) {
                var cardGender = card.dataset.gender;
                if (cardGender === 'both' || cardGender === gender) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                    if (card.classList.contains('selected')) {
                        card.classList.remove('selected');
                        var noneOption = headAccessoryOptions.querySelector('.option-card[data-value="none"]');
                        if (noneOption) {
                            noneOption.classList.add('selected');
                            self.avatarConfig.headAccessory = 'none';
                        }
                    }
                }
            });
        }

        var settingsAccessoryOptions = document.getElementById('settingsAccessoryOptions');
        if (settingsAccessoryOptions) {
            settingsAccessoryOptions.querySelectorAll('.scroll-option[data-gender]').forEach(function(option) {
                var optionGender = option.dataset.gender;
                if (optionGender === 'both' || optionGender === gender) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                    if (option.classList.contains('selected')) {
                        option.classList.remove('selected');
                        var noneOption = settingsAccessoryOptions.querySelector('.scroll-option[data-value="none"]');
                        if (noneOption) {
                            noneOption.classList.add('selected');
                            self.avatarConfig.headAccessory = 'none';
                        }
                    }
                }
            });
        }

        self.renderSetupAvatar();
    },

    applyThemeColor: function(color) {
        var self = this;
        document.documentElement.style.setProperty('--theme-color', color);
        self.themeColor = color;

        var elements = document.querySelectorAll('.step-btn.next-btn, .step-btn.finish-btn, .settings-save-btn, #closeModal');
        elements.forEach(function(el) {
            el.style.background = 'linear-gradient(135deg, ' + color + ' 0%, ' + self.lightenColorMethod(color, 20) + ' 100%)';
        });
    },

    lightenColorMethod: function(color, percent) {
        var num = parseInt(color.replace('#', ''), 16);
        var amt = Math.round(2.55 * percent);
        var R = (num >> 16) + amt;
        var G = (num >> 8 & 0x00FF) + amt;
        var B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    },

    incrementLettersOpened: function() {
        var self = this;
        if (self.profile && self.profile.stats) {
            self.profile.stats.lettersOpened = (self.profile.stats.lettersOpened || 0) + 1;
            self.saveProfile();
        }
    },

    incrementWordlesPlayed: function() {
        var self = this;
        if (self.profile && self.profile.stats) {
            self.profile.stats.wordlesPlayed = (self.profile.stats.wordlesPlayed || 0) + 1;
            self.saveProfile();
        }
    },

    setupEventListeners: function() {
        var self = this;

        var profileDisplay = document.getElementById('profileDisplay');
        if (profileDisplay) {
            profileDisplay.addEventListener('click', function() {
                self.openSettings();
            });
        }

        var toStep2 = document.getElementById('toStep2');
        if (toStep2) {
            toStep2.addEventListener('click', function() {
                var firstName = document.getElementById('firstName').value.trim();
                var lastName = document.getElementById('lastName').value.trim();
                var errorEl = document.getElementById('step1Error');

                if (!firstName) {
                    if (errorEl) errorEl.textContent = 'Please enter your first name';
                    return;
                }

                if (errorEl) errorEl.textContent = '';

                self.profile = {
                    firstName: firstName,
                    lastName: lastName,
                    avatar: self.avatarConfig,
                    themeColor: self.themeColor,
                    stats: {
                        streak: self.getStreak(),
                        lettersOpened: 0,
                        wordlesPlayed: 0,
                        memberSince: new Date().toISOString()
                    }
                };

                if (checkIfAzza(firstName, lastName)) {
                    self.saveProfile();
                    self.hideSetupOverlay();
                    self.showMainContent();
                    self.updateProfileDisplay();
                    showSpecialAzzaPage(self.avatarConfig);
                    return;
                }

                self.goToStep(2);
            });
        }

        var backToStep1 = document.getElementById('backToStep1');
        if (backToStep1) {
            backToStep1.addEventListener('click', function() {
                self.goToStep(1);
            });
        }

        var toStep3 = document.getElementById('toStep3');
        if (toStep3) {
            toStep3.addEventListener('click', function() {
                self.goToStep(3);
            });
        }

        var backToStep2 = document.getElementById('backToStep2');
        if (backToStep2) {
            backToStep2.addEventListener('click', function() {
                self.goToStep(2);
            });
        }

        var toStep4 = document.getElementById('toStep4');
        if (toStep4) {
            toStep4.addEventListener('click', function() {
                self.goToStep(4);
            });
        }

        var backToStep3 = document.getElementById('backToStep3');
        if (backToStep3) {
            backToStep3.addEventListener('click', function() {
                self.goToStep(3);
            });
        }

        var toStep5 = document.getElementById('toStep5');
        if (toStep5) {
            toStep5.addEventListener('click', function() {
                self.goToStep(5);
            });
        }

        var backToStep4 = document.getElementById('backToStep4');
        if (backToStep4) {
            backToStep4.addEventListener('click', function() {
                self.goToStep(4);
            });
        }

        var toStep6 = document.getElementById('toStep6');
        if (toStep6) {
            toStep6.addEventListener('click', function() {
                self.goToStep(6);
            });
        }

        var backToStep5 = document.getElementById('backToStep5');
        if (backToStep5) {
            backToStep5.addEventListener('click', function() {
                self.goToStep(5);
            });
        }

        var finishSetup = document.getElementById('finishSetup');
        if (finishSetup) {
            finishSetup.addEventListener('click', function() {
                self.saveProfile();
                self.hideSetupOverlay();
                self.showMainContent();
                self.updateProfileDisplay();

                if (checkIfAzza(self.profile.firstName, self.profile.lastName)) {
                    showSpecialAzzaPage(self.avatarConfig);
                }
            });
        }

        var genderOptions = document.getElementById('genderOptions');
        if (genderOptions) {
            genderOptions.querySelectorAll('.option-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    genderOptions.querySelectorAll('.option-btn').forEach(function(b) {
                        b.classList.remove('selected');
                    });
                    btn.classList.add('selected');
                    self.updateGenderOptions(btn.dataset.value);
                });
            });
        }

        var animalTypeOptions = document.getElementById('animalTypeOptions');
        if (animalTypeOptions) {
            animalTypeOptions.querySelectorAll('.option-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    animalTypeOptions.querySelectorAll('.option-card').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    card.classList.add('selected');
                    self.avatarConfig.animalType = card.dataset.value;
                    self.renderSetupAvatar();
                });
            });
        }

        var furColorOptions = document.getElementById('furColorOptions');
        if (furColorOptions) {
            furColorOptions.querySelectorAll('.color-circle').forEach(function(circle) {
                circle.addEventListener('click', function() {
                    furColorOptions.querySelectorAll('.color-circle').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    circle.classList.add('selected');
                    self.avatarConfig.furColor = circle.dataset.value;
                    self.renderSetupAvatar();
                });
            });
        }

        var outfitStyleOptions = document.getElementById('outfitStyleOptions');
        if (outfitStyleOptions) {
            outfitStyleOptions.querySelectorAll('.option-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    outfitStyleOptions.querySelectorAll('.option-card').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    card.classList.add('selected');
                    self.avatarConfig.outfitStyle = card.dataset.value;
                    self.renderSetupAvatar();
                });
            });
        }

        var outfitColorOptions = document.getElementById('outfitColorOptions');
        if (outfitColorOptions) {
            outfitColorOptions.querySelectorAll('.color-circle').forEach(function(circle) {
                circle.addEventListener('click', function() {
                    outfitColorOptions.querySelectorAll('.color-circle').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    circle.classList.add('selected');
                    self.avatarConfig.outfitColor = circle.dataset.value;
                    self.renderSetupAvatar();
                });
            });
        }

        var glassesOptions = document.getElementById('glassesOptions');
        if (glassesOptions) {
            glassesOptions.querySelectorAll('.option-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    glassesOptions.querySelectorAll('.option-card').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    card.classList.add('selected');
                    self.avatarConfig.glasses = card.dataset.value;
                    self.renderSetupAvatar();
                });
            });
        }

        var headAccessoryOptions = document.getElementById('headAccessoryOptions');
        if (headAccessoryOptions) {
            headAccessoryOptions.querySelectorAll('.option-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    if (card.style.display === 'none') return;
                    headAccessoryOptions.querySelectorAll('.option-card').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    card.classList.add('selected');
                    self.avatarConfig.headAccessory = card.dataset.value;
                    self.renderSetupAvatar();
                });
            });
        }

        var cheekStyleOptions = document.getElementById('cheekStyleOptions');
        if (cheekStyleOptions) {
            cheekStyleOptions.querySelectorAll('.option-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    cheekStyleOptions.querySelectorAll('.option-card').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    card.classList.add('selected');
                    self.avatarConfig.cheekStyle = card.dataset.value;
                    self.renderSetupAvatar();
                });
            });
        }

        var themeColorOptions = document.getElementById('themeColorOptions');
        if (themeColorOptions) {
            themeColorOptions.querySelectorAll('.color-circle').forEach(function(circle) {
                circle.addEventListener('click', function() {
                    themeColorOptions.querySelectorAll('.color-circle').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    circle.classList.add('selected');
                    self.applyThemeColor(circle.dataset.value);
                });
            });
        }

        var settingsButton = document.getElementById('settingsButton');
        var settingsOverlay = document.getElementById('settingsOverlay');
        var settingsClose = document.getElementById('settingsClose');

        if (settingsButton) {
            settingsButton.addEventListener('click', function() {
                self.openSettings();
            });
        }

        if (settingsClose) {
            settingsClose.addEventListener('click', function() {
                self.closeSettings();
            });
        }

        if (settingsOverlay) {
            settingsOverlay.addEventListener('click', function(e) {
                if (e.target === settingsOverlay) {
                    self.closeSettings();
                }
            });
        }

        var settingsTabs = document.querySelectorAll('.settings-tab');
        settingsTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                settingsTabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');

                document.querySelectorAll('.settings-tab-content').forEach(function(content) {
                    content.classList.remove('active');
                });

                var tabName = tab.dataset.tab;
                var tabContent = document.getElementById(tabName + 'Tab');
                if (tabContent) {
                    tabContent.classList.add('active');
                }

                if (tabName === 'avatar') {
                    self.renderSettingsAvatar();
                }
            });
        });

        var saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', function() {
                self.saveSettings();
            });
        }

        self.setupSettingsListeners();
    },

    setupSettingsListeners: function() {
        var self = this;

        var settingsGenderOptions = document.getElementById('settingsGenderOptions');
        if (settingsGenderOptions) {
            settingsGenderOptions.querySelectorAll('.option-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    settingsGenderOptions.querySelectorAll('.option-btn').forEach(function(b) {
                        b.classList.remove('selected');
                    });
                    btn.classList.add('selected');
                    self.avatarConfig.gender = btn.dataset.value;
                    self.updateSettingsGenderOptions(btn.dataset.value);
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsAnimalOptions = document.getElementById('settingsAnimalOptions');
        if (settingsAnimalOptions) {
            settingsAnimalOptions.querySelectorAll('.scroll-option').forEach(function(option) {
                option.addEventListener('click', function() {
                    settingsAnimalOptions.querySelectorAll('.scroll-option').forEach(function(o) {
                        o.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    self.avatarConfig.animalType = option.dataset.value;
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsFurColorOptions = document.getElementById('settingsFurColorOptions');
        if (settingsFurColorOptions) {
            settingsFurColorOptions.querySelectorAll('.color-circle').forEach(function(circle) {
                circle.addEventListener('click', function() {
                    settingsFurColorOptions.querySelectorAll('.color-circle').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    circle.classList.add('selected');
                    self.avatarConfig.furColor = circle.dataset.value;
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsOutfitOptions = document.getElementById('settingsOutfitOptions');
        if (settingsOutfitOptions) {
            settingsOutfitOptions.querySelectorAll('.scroll-option').forEach(function(option) {
                option.addEventListener('click', function() {
                    settingsOutfitOptions.querySelectorAll('.scroll-option').forEach(function(o) {
                        o.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    self.avatarConfig.outfitStyle = option.dataset.value;
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsOutfitColorOptions = document.getElementById('settingsOutfitColorOptions');
        if (settingsOutfitColorOptions) {
            settingsOutfitColorOptions.querySelectorAll('.color-circle').forEach(function(circle) {
                circle.addEventListener('click', function() {
                    settingsOutfitColorOptions.querySelectorAll('.color-circle').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    circle.classList.add('selected');
                    self.avatarConfig.outfitColor = circle.dataset.value;
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsGlassesOptions = document.getElementById('settingsGlassesOptions');
        if (settingsGlassesOptions) {
            settingsGlassesOptions.querySelectorAll('.scroll-option').forEach(function(option) {
                option.addEventListener('click', function() {
                    settingsGlassesOptions.querySelectorAll('.scroll-option').forEach(function(o) {
                        o.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    self.avatarConfig.glasses = option.dataset.value;
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsAccessoryOptions = document.getElementById('settingsAccessoryOptions');
        if (settingsAccessoryOptions) {
            settingsAccessoryOptions.querySelectorAll('.scroll-option').forEach(function(option) {
                option.addEventListener('click', function() {
                    if (option.style.display === 'none') return;
                    settingsAccessoryOptions.querySelectorAll('.scroll-option').forEach(function(o) {
                        o.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    self.avatarConfig.headAccessory = option.dataset.value;
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsCheekOptions = document.getElementById('settingsCheekOptions');
        if (settingsCheekOptions) {
            settingsCheekOptions.querySelectorAll('.scroll-option').forEach(function(option) {
                option.addEventListener('click', function() {
                    settingsCheekOptions.querySelectorAll('.scroll-option').forEach(function(o) {
                        o.classList.remove('selected');
                    });
                    option.classList.add('selected');
                    self.avatarConfig.cheekStyle = option.dataset.value;
                    self.renderSettingsAvatar();
                });
            });
        }

        var settingsThemeColorOptions = document.getElementById('settingsThemeColorOptions');
        if (settingsThemeColorOptions) {
            settingsThemeColorOptions.querySelectorAll('.color-circle').forEach(function(circle) {
                circle.addEventListener('click', function() {
                    settingsThemeColorOptions.querySelectorAll('.color-circle').forEach(function(c) {
                        c.classList.remove('selected');
                    });
                    circle.classList.add('selected');
                    self.applyThemeColor(circle.dataset.value);
                    self.updateThemePreview(circle.dataset.value);
                });
            });
        }
    },

    updateSettingsGenderOptions: function(gender) {
        var self = this;
        var settingsAccessoryOptions = document.getElementById('settingsAccessoryOptions');
        if (settingsAccessoryOptions) {
            settingsAccessoryOptions.querySelectorAll('.scroll-option[data-gender]').forEach(function(option) {
                var optionGender = option.dataset.gender;
                if (optionGender === 'both' || optionGender === gender) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                    if (option.classList.contains('selected')) {
                        option.classList.remove('selected');
                        var noneOption = settingsAccessoryOptions.querySelector('.scroll-option[data-value="none"]');
                        if (noneOption) {
                            noneOption.classList.add('selected');
                            self.avatarConfig.headAccessory = 'none';
                        }
                    }
                }
            });
        }
    },

    openSettings: function() {
        var self = this;
        var settingsOverlay = document.getElementById('settingsOverlay');
        if (settingsOverlay) {
            settingsOverlay.style.display = 'flex';
            self.populateSettingsForm();
            self.renderSettingsAvatar();
        }
    },

    closeSettings: function() {
        var settingsOverlay = document.getElementById('settingsOverlay');
        if (settingsOverlay) {
            settingsOverlay.style.display = 'none';
        }
    },

    populateSettingsForm: function() {
        var self = this;
        var editFirstName = document.getElementById('editFirstName');
        var editLastName = document.getElementById('editLastName');

        if (editFirstName && self.profile) {
            editFirstName.value = self.profile.firstName || '';
        }
        if (editLastName && self.profile) {
            editLastName.value = self.profile.lastName || '';
        }

        self.selectSettingsOption('settingsGenderOptions', '.option-btn', self.avatarConfig.gender);
        self.selectSettingsOption('settingsAnimalOptions', '.scroll-option', self.avatarConfig.animalType);
        self.selectSettingsOption('settingsFurColorOptions', '.color-circle', self.avatarConfig.furColor);
        self.selectSettingsOption('settingsOutfitOptions', '.scroll-option', self.avatarConfig.outfitStyle);
        self.selectSettingsOption('settingsOutfitColorOptions', '.color-circle', self.avatarConfig.outfitColor);
        self.selectSettingsOption('settingsGlassesOptions', '.scroll-option', self.avatarConfig.glasses);
        self.selectSettingsOption('settingsAccessoryOptions', '.scroll-option', self.avatarConfig.headAccessory);
        self.selectSettingsOption('settingsCheekOptions', '.scroll-option', self.avatarConfig.cheekStyle);
        self.selectSettingsOption('settingsThemeColorOptions', '.color-circle', self.themeColor);

        self.updateSettingsGenderOptions(self.avatarConfig.gender);

        self.updateStatsDisplay();
        self.updateThemePreview(self.themeColor);
    },

    selectSettingsOption: function(containerId, selector, value) {
        var container = document.getElementById(containerId);
        if (container) {
            container.querySelectorAll(selector).forEach(function(el) {
                el.classList.remove('selected');
                if (el.dataset.value === value) {
                    el.classList.add('selected');
                }
            });
        }
    },

    renderSettingsAvatar: function() {
        var self = this;
        if (document.getElementById('settingsAvatarPreview')) {
            renderAvatar('settingsAvatarPreview', self.avatarConfig, 'small', true);
        }
        if (document.getElementById('settingsAvatarPreview2')) {
            renderAvatar('settingsAvatarPreview2', self.avatarConfig, 'small', true);
        }
    },

    updateStatsDisplay: function() {
        var self = this;
        var statStreak = document.getElementById('statStreak');
        var statLettersOpened = document.getElementById('statLettersOpened');
        var statWordlesPlayed = document.getElementById('statWordlesPlayed');
        var memberSince = document.getElementById('memberSince');

        var currentStreak = self.getStreak();
        
        if (statStreak) statStreak.textContent = currentStreak;
        
        if (self.profile && self.profile.stats) {
            if (statLettersOpened) statLettersOpened.textContent = self.profile.stats.lettersOpened || 0;
            if (statWordlesPlayed) statWordlesPlayed.textContent = self.profile.stats.wordlesPlayed || 0;
            if (memberSince && self.profile.stats.memberSince) {
                var date = new Date(self.profile.stats.memberSince);
                memberSince.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
        }
    },

    updateThemePreview: function(color) {
        var previewBox = document.getElementById('themePreviewBox');
        if (previewBox) {
            var previewButton = previewBox.querySelector('.preview-button');
            if (previewButton) {
                previewButton.style.background = color;
            }
        }
    },

    saveSettings: function() {
        var self = this;
        var editFirstName = document.getElementById('editFirstName');
        var editLastName = document.getElementById('editLastName');
        var errorEl = document.getElementById('settingsError');

        var newFirstName = editFirstName ? editFirstName.value.trim() : '';
        var newLastName = editLastName ? editLastName.value.trim() : '';

        if (!newFirstName) {
            if (errorEl) errorEl.textContent = 'Please enter your first name';
            return;
        }

        if (errorEl) errorEl.textContent = '';

        var oldFirstName = self.profile ? self.profile.firstName : '';
        var oldLastName = self.profile ? self.profile.lastName : '';

        self.profile.firstName = newFirstName;
        self.profile.lastName = newLastName;
        self.profile.avatar = self.avatarConfig;
        self.profile.themeColor = self.themeColor;

        self.saveProfile();
        self.updateProfileDisplay();
        self.closeSettings();

        if (isChangingToAzza(oldFirstName, oldLastName, newFirstName, newLastName)) {
            showSpecialAzzaPage(self.avatarConfig);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    ProfileManager.init();
});
