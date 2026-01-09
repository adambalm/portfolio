---
title: "Skill Forge: Distributed AI Forensic Audio Restoration (Pattern: MDX-Net/VR Centrifuge)"
type: note
permalink: dialogues/distributed-forensic-audio-restoration-forge
status: draft
temporal_type: dynamic
valid_from: 2026-01-04
last_verified: 2026-01-04
tags:
- skill-forge
- lanesborough-protocol
- forensic-audio-recovery
- creative-writing
- hip-hop-lyrics
- performance-art
- source-separation
- distributed-compute-orchestration
---

# Skill Forge: Distributed AI Forensic Audio Restoration

**Pattern:** MDX-Net/VR Centrifuge
**Date:** 2026-01-04
**Status:** STUB - Awaiting deliberation session

---

## Role Assignments

| Role | Agent | Protocol |
|------|-------|----------|
| Human Orchestrator (HO) | Ed O'Connell | Final Approval / Gatekeeper |
| Generalizing AI (GA) | Claude Code (Opus 4.5) | Solution Architect / Implementer |
| Inspecting AI (IA) | Gemini 1.5 Pro | Forensic Auditor / Schema Enforcer |

**Transport:** Manual Paste (Obsidian) — GitHub → Gemini → GitHub

**Heterogeneity note:** Gemini's multimodal video/audio analysis capabilities are critical for this track. GA cannot replicate IA's forensic auditing of source material.

---

## Gate Status

| Gate | Status |
|------|--------|
| Understanding Gate | NOT STARTED |
| Agreement Gate | NOT STARTED |

---

## Project Scope

Extracting a reusable Thin Skill for forensic audio recovery of a high-density creative performance. The objective is to preserve the integrity of hip-hop lyricism and vocal transients against high-reverb gymnasium acoustics using a distributed MDX-NET centrifuge pattern.

**Success Criteria** (per IA Reflection):
- Consonant Sharpness preservation
- Rhythmic Cadence preservation
- These metrics distinguish this from generic signal-processing tasks

---

## Raw Dialogue Transcript

### Phase 1: Initial Audio Analysis & Strategy

**HO (Ed):**
I am providing a video artifact for analysis. You are to cross-reference ChatGPT's analysis against the actual video artifact. The goal is to maximize intelligibility while retaining the crowd energy.

*Context provided: ChatGPT suggested a workflow involving "Vibe" and "Clarity" tracks using sidechain ducking in DaVinci Resolve.*

**Gemini (IA):**
I will process the video frame-by-frame and analyze audio waveforms to cross-reference the suggestions. I will specifically look for where the "vibe" (crowd noise, room acoustics) masks specific frequencies and whether sidechain settings will create unnatural artifacts.

**Blockers:**
1.  **The Sound Source:** Is the backing track coming through the PA system?
2.  **Length:** How long is the clip?

**HO (Ed):**
It’s all one sound source, essentially a single-source iPhone recording from the audience. No way to isolate natively. It’s a little under three minutes.

**Gemini (IA):**
Since it is a single-source audience recording, the strategy shifts to **parallel processing**.

**Technical adjustments to ChatGPT advice:**
1.  **The "Sidechain Ducking" Pitfall:** Using Track B (Clarity) as a trigger when it contains crowd noise will cause ducking during crowd swells, not just vocals. **Voice Isolation** or **Waves Clarity Vx** must be applied to Track B *before* using it as a sidechain trigger.
2.  **High-Pass Filter (HPF):** Audience recordings often require a higher cut, potentially **150–200 Hz**, to address low-end mud.
3.  **Noise Profiling:** The intro section should be used to sample ambient room noise.

**HO (Ed):**
I will provide the lyrical transcript to assist in analysis.

**Gemini (IA):**
The transcript serves as a "source of truth" for:
* **Phonetic Mapping:** Identifying specific "plosives" (p, b, t, k) or "sibilance" (s, sh).
* **Sync Accuracy:** Identifying the beat "pocket."
* **Masking Analysis:** Pinpointing specific words buried by frequency clashes.

**HO (Ed):**
*Transcript provided.* Note: No metronome or backing track was used.

**Gemini (IA):**
The absence of a backing track makes the rhythm dependent on the internal clock.

**Technical Analysis of Artifact Reality:**
1.  **Transition Points:** Soft vowel endings are susceptible to frequency masking during crowd swells.
2.  **Caesuras:** Rhythmic breaks allow room reverb to fill the vacuum.
3.  **Plosives:** The "E-D-M-O-N-D" spelling sequence is at risk of clipping or disappearing on an iPhone mic.

**HO (Ed):**
Context: This was a transition performance at a school talent show. The crowd reaction builds based on the "reveal" of the performance nature.

**Gemini (IA):**
The narrative context implies an audio profile shift from ambient noise to active cheering.
* **Frequency Target:** "Teacher Voice" projection suggests strong mid-range. Clarity track should focus on **3kHz to 5kHz**.
* **Dynamics:** Ducking automation will be required to match the crowd swell curve.

*Video Uploaded and Analyzed*

### Phase 2: Video Artifact Analysis

**Gemini (IA):**
Video artifact analysis confirms recoverability.

**The "Reality Check" Plan:**
1.  **The Pivot (01:18 - 01:21):** Do not duck the crowd here. Use a **frequency-specific expander** between **3kHz and 5kHz** to emphasize transients ("T" and "CH") over the noise floor.
2.  **The Grid (01:38 - 01:42):** Visual analysis confirms mic drift (head turn). Requires **De-Reverb** and a **+3dB gain boost** starting at 01:39.
3.  **Peak Masking (01:48 - 01:52):** Crowd peak coincides with sibilance. Increase Compressor Attack to **30ms** to preserve the initial "S" transient.
4.  **False Start (01:57 - 02:00):** Edit point identified at **01:56**.
5.  **Outro (02:09 - 02:11):** **High-Shelf EQ boost (+4dB)** at **6kHz** required to retain intelligibility during walk-off.

### Phase 3: Hardware & Infrastructure

**HO (Ed):**
Current Infrastructure: Asus Vivobook (Windows) and an Ubuntu Server (Adambalm) with an RTX 5060 Ti.

**Gemini (IA):**
**Hardware Recommendation: Adambalm (Ubuntu Server)**
* **Suphouse (Laptop):** i7-1255U, 16GB RAM. Capable of UI work/Assembly.
* **Adambalm (Server):** RTX 5060 Ti (16GB VRAM), 64GB RAM. Optimal for AI audio separation.

**The Hybrid Workflow:**
1.  **Phase 1 (Adambalm):** Use **Docker** to run **UVR (Ultimate Vocal Remover)** or **Demucs** on the GPU. This physically separates the vocal from the gym reverb.
2.  **Phase 2 (Suphouse):** Import the "AI Clean" vocal into DaVinci Resolve on the laptop. Layer it over the original "Vibe" track.

**HO (Ed):**
I will upgrade models on Adambalm.

**Gemini (IA):**
**The Audio Separation Stack (Adambalm):**
* **Demucs v4 (htdemucs_ft):** Baseline separation.
* **MDX-Net (UVR):** Surgical separation for high-reverb environments.
* **BSRo (De-Reverb):** Secondary pass to remove "Room Bloom."

**HO (Ed):**
How technically precise is the performance from a machine/ai perspective?

**Gemini (IA):**
**PERFORMANCE AUDIT: IMG_7118.mov**
* **RHYTHMIC PRECISION:** High stability. Internal tempo (95 BPM) maintained without external reference. The "E-D-M-O-N-D" spelling aligns with the 1/8th note grid.
* **COMPLEXITY & STRUCTURE:** High internal rhyme density. The "Nature/Overrate ya" slant maintains consistent vowel nucleus duration.
* **PHONETIC ANALYSIS:** Initial transients are sharp. Significant high-frequency loss detected at 01:38 due to mic drift. The "Unwinds" drag is identified as intentional expressive timing (phase shift) rather than tempo drift.

**TECHNICAL SCORECARD:**
* Tempo Stability: **9.2/10**
* Syllabic Density: **8.8/10**
* Intelligibility: **6.5/10** (Due to Room Reverb Masking)
* Structural Integrity: **9.5/10**

### Phase 4: Implementation Plan

**HO (Ed):**
Provide the technical plan and reasoning.

**Gemini (IA):**
**The Technical Plan: "The Double-Pass Forensic Reconstruction"**

1.  **Hardware:** Adambalm (Compute Node/CLI UVR5) + Suphouse (Client Node/Resolve). Transport via Tailscale.
2.  **Phase 1: Isolation (MDX-Net):** Use `UVR-MDX-NET-Voc_FT` to strip crowd noise.
3.  **Phase 2: Acoustic Clean (VR Architecture):** Use `UVR-De-Echo-De-Reverb` to target gym acoustics.
4.  **Phase 3: Parallel Mix (Suphouse):** Layer "Forensic Dry" over "Original Vibe."

**Deployment Instructions (Adambalm):**
```bash
pip install "audio-separator[gpu]"
audio-separator "IMG_7118.wav" --model_filename UVR-MDX-NET-Voc_FT --output_dir ./output
audio-separator "./output/Vocals_IMG_7118.wav" --model_filename UVR-De-Echo-De-Reverb --output_dir ./final
```

**HO (Ed):**
Constraints check: We do not have .wav files.

**Gemini (IA):**
Lossless extraction is required to prevent aliasing artifacts in the AI inference.
**Command (Suphouse):**
```bash
ffmpeg -i IMG_7118.mov -vn -acodec pcm_s24le -ar 44100 Edmond_Forensic_Source.wav
scp Edmond_Forensic_Source.wav ed@100.111.114.84:~/forensic-audio/
```

**HO (Ed):**
Identify potential technical failures ("gotchas").

**Gemini (IA):**
1.  **Phase Smearing:** AI separation introduces latency. Waveforms must be manually aligned at the sub-frame level in Resolve.
2.  **Digital "Chirping":** Artifacts from over-processing. A 70/30 blend (70% AI, 30% Gate) is recommended.
3.  **Sibilance Loss:** Use a **Subharmonic Synthesizer** or Exciter on the high end to recover lost "S" sounds from mic drift.
4.  **Noise Floor Pumping:** A "Comfort Noise" track generated from the intro dead air is required to smooth edits.

### Phase 5: The "Skill Forge" Amortization

**HO (Ed):**
Explain the decision matrix and amortization potential.

**Gemini (IA):**
**Reasoning:**
* **Distributed Compute:** Bypassing the 16GB laptop RAM limit allows for "Large Segment" processing, preventing segmentation seams.
* **Two-Pass Forensic:** Sequential separation of "Noise" (Crowd) and "Acoustics" (Room) prevents transient smearing.

**Capabilities Demonstrated:**
* Transition from Content Consumer to **Infrastructure Orchestrator**.
* **Model-Task Alignment:** Matching architecture (MDX vs VR) to physics (diffusion vs reflection).

**Amortizable Skill (Future Use Cases):**
* Historical Archive Rescue.
* Field Journalism/Podcast Rescue.
* Classroom Accessibility Enhancement.

**HO (Ed):**
Review logic against "Thin Skills" architecture.

*(Context provided: "What Are Thin Skills?" explanation, "Skill Forge" process, and "Lanesborough Protocol" details).*

**Gemini (IA):**
As the **Inspecting AI (IA)**, I have reviewed the plan against the **Lanesborough** and **Black Flag Protocols**.

**Architectural Audit:**
* **[Verified] Distributed Compute Strategy:** Adambalm (RTX 5060 Ti) is correct for memory-bound MDX-Net.
* **[Cannot Verify] Signal-to-Noise Floor:** Potential anti-pattern during "mic drift."
* **[Contradicts] Phase Smearing:** Simple alignment is insufficient; the Thin Skill must include a **Sub-Frame Alignment Protocol**.

**Drafting `INSTRUCTIONS.md` Seed:**
* **CANARY:** `FORENSIC-AUDIO-RECOVERY-SEED-2026-01-04-EDMOND`
* **Purpose:** Recover high-intelligibility vocal stems from single-source field recordings.
* **Execution Steps:** Lossless Extraction -> Distributed Inference (Pass 1 & 2) -> Parallel Reconstruction.

### Phase 6: Final Protocol & Handoff

**HO (Ed):**
We will move this to GitHub documentation. I will have Claude Code read the transcript to begin the Skill Forge pattern.

**Gemini (IA):**
I approve the move to GitHub. I will audit the existing infrastructure to ensure schema compliance before proposing frontmatter.

*(Claude Code Audit of Existing Metadata Schema performed)*

**Gemini (IA):**
**GA-STRUCTURAL-AUDIT** received.
* **Frontmatter Compliance:** Verified (7-field schema).
* **Location:** `transcripts/` directory.
* **Role:** IA (Inspecting AI).

**HO (Ed):**
Prompt Claude Code to create the stub. Include tags for creative writing/lyrics to contextualize the performance.

**Gemini (IA):**
Adding `creative-writing` and `hip-hop-lyrics` tags ensures the success criteria includes "Consonant Sharpness" and "Rhythmic Cadence."

**Final Handoff Prompt for Claude Code:**
> **Task:** Read the synced dialogue note. Initialize the session as GA. Confirm meta-awareness of Lanesborough Protocol and Context Sage. Perform system-level check of Suphouse/Adambalm.

**HO (Ed):**
Include Black Flag and Temporal Validity commitments.

**Gemini (IA):**
Integrated. I will now remain in a "Deep Passive" state until Claude Code initializes the GitHub-backed session.

**Final Revised Prompt for Claude Code:**
> **PROMPT FOR CLAUDE CODE:**
>
> I am onboarding Gemini as the **Inspecting AI (IA)** for the **Skill Forge** engagement: **Track-A-Forensic-Audio-Recovery**.
>
> **Task:**
> 1.  **Context Load:** Read the recently synced dialogue note: `dialogues/2026-01-04-forensic-audio-restoration-skill-forge.md`.
> 2.  **Role Initialization:** Formally initialize your role as the **Generalizing AI (GA)**. Confirm your meta-awareness of the **Lanesborough Protocol** and the **Context Sage** environment.
> 3.  **Black Flag Commitment:** Explicitly acknowledge your commitment to the **Black Flag Protocol**. Treat all state-data as suspect until verified.
> 4.  **Temporal Validity Commitment:** Verify the "last_verified" status of the environment setup on Adambalm.
> 5.  **State Check:** Acknowledge the current state of the **Understanding Gate** (OPEN) and provide a summary of the implementation path.
>
> Provide your response to formalize the GitHub-backed exchange.

---

## IA Reflection (Gemini)

> Adding `creative-writing` and `hip-hop-lyrics` tags prevents the system from treating this as a generic signal-processing task. It signals to any future model reading this skill that the success criteria must include "Consonant Sharpness" and "Rhythmic Cadence" preservation—metrics that wouldn't matter for a simple air-conditioning hum removal.

---

## Relations

- governed_by [[Lanesborough Protocol]]
- governed_by [[Black Flag Protocol]]
- will_produce [[Thin Skill Architecture]] artifact
- uses [[Skill Forge Pattern]]
