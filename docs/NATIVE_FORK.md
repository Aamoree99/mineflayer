# Native protocol compatibility fork

Base: wupengabc/mineflayer 8a297bd003fab90adb324cd28b2a874eed04d87e (@wp2508/mineflayer4.42.2), which inherits PrismarineJS and third-party protocol work. Own patches: block placement hitResult, action IDs/shared sequences, entity deltas, deferred teleport acknowledgements and relative rotation. Tick-input and float player-dimension fixes are separate branches stacked on compat; integration combines them. Original licenses and contributor attribution retained.

Regression entry point: node --test test/native-compatibility.node.cjs (after installing dependencies). Each branch includes tests only for the fixes it contains. These are deterministic packet/physics boundary tests, not a live server integration certification. Native dependency versions are independently pinned by the consuming application. No gameplay, AI or server-specific configuration is included.
