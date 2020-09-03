import { html } from 'lit-html';
import * as styles from './styles.js';

const { css } = styles;
const bannerStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000000;
  text-align: center;
  z-index: 10;
`;


export function designer(data, listeners) {
  return html`
    <!-- LOADER -->
    ${data.player.loading ?
      html`<div style="${bannerStyles}">loading...</div>` : ''
    }

    <!-- HEADER -->
    <h2 style="${styles.h2}">Session: ${data.session.name}</h2>

    <div style="position: relative; min-height: 50px">
      <h3 style="${styles.h3}">PlayerId: ${data.player.id}</h3>

      <button
        style="
          ${styles.button}
          width: 200px;
          position: absolute;
          top: 0px;
          right: 0px;
          margin: 0;
        "
        @click="${e => listeners.setPlayerParams({ sessionId: null })}">
        change session
      </button>
    </div>

    <!-- RECORDING MANAGEMENT -->
    <div style="margin: 10px 0;">
      <h2 style="${styles.h2}">Recording</h2>
      <label>
        <!-- @todo - this should also filter "active" files -->
        <select
          style="${styles.select}"
          @change="${e => listeners.setPlayerParams({ label: e.target.value })}"
        >
          ${data.session.audioFiles
            .map(file => file.label)
            .filter((label, index, arr) => arr.indexOf(label) === index)
            .sort()
            .map(label => {
              return html`
                <option
                  value="${label}"
                  ?selected="${data.player.label === label}"
                >${label}</option>`
            })
          }
        </select>
      </label>

      <div style="height: 96px">
        ${data.player.recordingState === 'idle'
          ? html`<button
              style="
                ${styles.button}
                background-color: #28a745;
                height: 88px;
                line-height: 88px;
              "
              @click="${e => listeners.setPlayerParams({ recordingState: 'armed' })}"
            >record new gesture</button>`
          : ``}

        ${data.player.recordingState === 'armed'
          ? html`<button
              style="
                ${styles.button}
                background-color: #ffc107;
                height: 88px;
                line-height: 88px;
              "
              @click="${e => listeners.setPlayerParams({ recordingState: 'recording' })}"
            >start</button>`
          : ``}

        ${data.player.recordingState === 'recording'
          ? html`<button
              style="
                ${styles.button}
                background-color: #dc3545;
                height: 88px;
                line-height: 88px;
              "
              @click="${e => listeners.setPlayerParams({ recordingState: 'pending' })}"
            >stop</button>`
          : ``}

        ${data.player.recordingState === 'pending'
          ? html`
            <button
                style="
                  ${styles.button}
                  background-color: #007bff;
                "
              @click="${e => listeners.setPlayerParams({ recordingState: 'confirm' })}"
            >save</button>
            <button
                style="
                  ${styles.button}
                "
              @click="${e => listeners.setPlayerParams({ recordingState: 'cancel' })}"
            >cancel</button>`
          : ``}
      </div>
    </div>

    <!-- EXAMPLES MANAGEMENT -->
    <div style="margin: 10px 0">
      <h2 style="${styles.h2}">Gestures</h2>

      ${Object.values(data.session.examples)
        .map(example => example.label)
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .map(label => {
          return html`
            <div style="overflow: auto">
              <span style="
                font-size: 16px;
                display: inline-block;
                height: 30px;
                line-height: 30px;
              ">${label}</span>
              <button
                style="
                  ${styles.button}
                  float: right;
                  width: auto;
                  background-color: #ffc107;
                  height: 30px;
                  line-height: 30px;
                "
                @click="${e => listeners.clearSessionLabel(label)}"
              >delete</button>
            </div>
          `;
        })
      }

      <button
        style="
          ${styles.button}
          background-color: #dc3545;
          height: 30px;
          line-height: 30px;
        "
        @click="${e => listeners.clearSessionExamples()}"
      >clear all labels</button>
    </div>
  `;
}
