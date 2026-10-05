import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  createComponentModel,
  disposeModel,
  type PartId,
  type ComponentModel,
} from "../three/models";

function FallbackModel({ part, action }: { part: PartId; action: boolean }) {
  const pins = Array.from({ length: 14 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 520 470"
      className={`fallback-model ${action ? "is-acting" : ""}`}
      role="img"
      aria-label={`Modelo ilustrativo: ${{ chip: "ESP32", servo: "servomotor", arm: "brazo", case: "carcasa 3D" }[part]}`}
    >
      <defs>
        <linearGradient id="metal" x2="1" y2="1">
          <stop stopColor="#f2f0e9" />
          <stop offset=".45" stopColor="#b5b9b4" />
          <stop offset=".6" stopColor="#e0e0d8" />
          <stop offset="1" stopColor="#8c9690" />
        </linearGradient>
        <linearGradient id="ivory" x2="1" y2="1">
          <stop stopColor="#fcf5e6" />
          <stop offset=".55" stopColor="#ddd0b9" />
          <stop offset="1" stopColor="#b3a187" />
        </linearGradient>
        <linearGradient id="blue" x2="1" y2="1">
          <stop stopColor="#5484a5" />
          <stop offset=".45" stopColor="#276089" />
          <stop offset="1" stopColor="#123955" />
        </linearGradient>
        <linearGradient id="pcb" x2="1" y2="1">
          <stop stopColor="#385c51" />
          <stop offset="1" stopColor="#132b28" />
        </linearGradient>
        <filter id="model-shadow" x="-50%" y="-50%" width="200%" height="220%">
          <feDropShadow
            dx="12"
            dy="20"
            stdDeviation="15"
            floodColor="#173d46"
            floodOpacity=".21"
          />
        </filter>
      </defs>
      <ellipse
        cx="270"
        cy="403"
        rx="127"
        ry="14"
        fill="#173d46"
        opacity=".08"
      />
      {part === "chip" && (
        <g
          transform="translate(257 227) rotate(-14) skewY(5)"
          filter="url(#model-shadow)"
        >
          <rect
            x="-83"
            y="-153"
            width="172"
            height="315"
            rx="13"
            fill="#0f2725"
          />
          <rect
            x="-89"
            y="-160"
            width="172"
            height="315"
            rx="13"
            fill="url(#pcb)"
            stroke="#5b776b"
          />
          {[-73, 67].map((x) => (
            <g key={x}>
              {pins.map((i) => (
                <g key={i}>
                  <path
                    d={`M${x} ${-121 + i * 19}h-8v12h8`}
                    stroke="#c6a75c"
                    strokeWidth="4"
                  />
                  <circle
                    cx={x}
                    cy={-125 + i * 19}
                    r="4"
                    stroke="#ccaf6a"
                    fill="#26352e"
                  />
                  <path
                    d={`M${x + (x < 0 ? 12 : -12)} ${-125 + i * 19}h${x < 0 ? 9 : -9}`}
                    stroke="#b4c1aa"
                    strokeWidth="1.3"
                  />
                </g>
              ))}
            </g>
          ))}
          <path
            d="M-42-96v-17h72v-12h-72v-12h72v-12h-72"
            stroke="#b8a65c"
            strokeWidth="3"
            fill="none"
          />
          <rect
            x="-52"
            y="-84"
            width="100"
            height="138"
            rx="5"
            fill="url(#metal)"
            stroke="#98a9a2"
          />
          <text
            x="-2"
            y="-20"
            textAnchor="middle"
            fontFamily="Arial"
            fontSize="15"
            fill="#5e6965"
          >
            ESP32
          </text>
          <text
            x="-2"
            y="1"
            textAnchor="middle"
            fontFamily="Arial"
            fontSize="8"
            letterSpacing="1"
            fill="#74807a"
          >
            Wi-Fi MODULE
          </text>
          <rect x="-14" y="73" width="24" height="29" rx="2" fill="#202727" />
          {[
            [-46, 66],
            [32, 68],
            [-40, 96],
            [29, 103],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="14" height="9" fill="#b7b6a6" />
              <rect x={x + 3} y={y} width="8" height="9" fill="#5c5f53" />
            </g>
          ))}
          <rect
            x="-26"
            y="124"
            width="48"
            height="34"
            rx="4"
            fill="url(#metal)"
          />
          <path d="M-17 151h30" stroke="#27322c" strokeWidth="7" />
          <circle cx="39" cy="90" r="4" fill={action ? "#c8ffe6" : "#78ae95"} />
          {[-48, 43].map((x) => (
            <g key={x}>
              <rect
                x={x - 7}
                y="121"
                width="17"
                height="17"
                rx="2"
                fill="#aaa"
              />
              <circle cx={x + 1} cy="130" r="4" fill="#202526" />
            </g>
          ))}
        </g>
      )}
      {part === "servo" && (
        <g filter="url(#model-shadow)">
          <path
            d="M242 338c-25 67 60 80 91 40s44-70 61-30"
            fill="none"
            stroke="#553e2c"
            strokeWidth="5"
          />
          <path
            d="M251 338c-25 67 60 80 91 40s44-70 61-30"
            fill="none"
            stroke="#b5573d"
            strokeWidth="5"
          />
          <path
            d="M260 338c-25 67 60 80 91 40s44-70 61-30"
            fill="none"
            stroke="#c7a359"
            strokeWidth="5"
          />
          <path
            d="M170 170l53-35 138 30v173l-51 35-140-31Z"
            fill="#163a55"
            stroke="#346a8b"
          />
          <path d="M170 170l53-35 138 30-51 35Z" fill="#7196aa" />
          <path d="M170 170l140 30v173l-140-31Z" fill="url(#blue)" />
          <path
            d="M142 192l59 12v20l-59-12Zm167 35 73-41v19l-73 41Z"
            fill="#376a8b"
            stroke="#193f58"
          />
          <path d="M191 236l91 19v56l-91-18Z" fill="#e1dac2" />
          <text
            x="216"
            y="273"
            fill="#465154"
            fontSize="13"
            transform="rotate(12 215 273)"
          >
            SERVO
          </text>
          <path d="M174 321l132 28" stroke="#12344e" strokeWidth="9" />
          <ellipse cx="249" cy="157" rx="35" ry="20" fill="#597f9b" />
          <path d="M217 157v18c10 17 56 17 66 0v-18" fill="#345978" />
          <ellipse cx="249" cy="143" rx="16" ry="10" fill="#bf9c52" />
          <path d="M233 143v23c6 10 26 10 32 0v-23" fill="#b49148" />
          <g className="servo-horn" style={{ transformOrigin: "249px 145px" }}>
            <path
              d="M240 147l-72-47q-8-12 6-15l76 42 78-1q15 5 3 16l-78 13Z"
              fill="url(#ivory)"
              stroke="#bfb5a1"
            />
            {[185, 205, 292, 312].map((x, i) => (
              <ellipse
                key={x}
                cx={x}
                cy={[101, 113, 138, 135][i]}
                rx="3.5"
                ry="2.5"
                fill="#827765"
              />
            ))}
            <ellipse cx="249" cy="141" rx="11" ry="7" fill="url(#metal)" />
            <path d="M243 140l12 3" stroke="#58615e" strokeWidth="2" />
          </g>
        </g>
      )}
      {part === "arm" && (
        <g
          className="arm-lever"
          style={{ transformOrigin: "220px 322px" }}
          filter="url(#model-shadow)"
        >
          <path
            d="M187 320l81-222q7-18 22-12l15 7q15 6 7 23l-71 221Z"
            fill="#aa9b81"
          />
          <path
            d="M177 311l81-222q7-18 22-12l15 7q15 6 7 23l-71 221Z"
            fill="url(#ivory)"
            stroke="#eee3d0"
          />
          {[140, 173, 206, 239].map((y, i) => (
            <ellipse
              key={y}
              cx={277 - i * 12}
              cy={y}
              rx="6"
              ry="7"
              fill="#7b7160"
              transform={`rotate(20 ${277 - i * 12} ${y})`}
            />
          ))}
          <ellipse cx="217" cy="325" rx="51" ry="47" fill="#a3824d" />
          <ellipse
            cx="209"
            cy="316"
            rx="51"
            ry="47"
            fill="#c8ac78"
            stroke="#dfc690"
          />
          <ellipse cx="209" cy="316" rx="21" ry="20" fill="#3e3d38" />
          <ellipse cx="209" cy="316" rx="11" ry="10" fill="#a2977f" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx={209 + Math.sin((i * Math.PI) / 3) * 35}
              cy={316 + Math.cos((i * Math.PI) / 3) * 33}
              r="4"
              fill="url(#metal)"
            />
          ))}
          <path d="M253 91l12-29 43 14-10 32Z" fill="#4a4740" />
          <path d="M265 62l12-7 43 14-12 7" fill="#6b675c" />
        </g>
      )}
      {part === "case" && (
        <g filter="url(#model-shadow)">
          <path d="M137 231l154-48 105 96-154 51Z" fill="#b3a78e" />
          <path d="M137 231v101l105 91V330Z" fill="#c7b99d" />
          <path d="M242 330l154-51v102l-154 42Z" fill="#eadfc6" />
          <path d="M151 236l139-39 89 84-136 41Z" fill="#a99d86" />
          <path d="M151 236v77l93 82v-73Z" fill="#f0e6d1" />
          <path d="M244 322l135-41v81l-135 33Z" fill="#ddcfb2" />
          {[
            [170, 271],
            [271, 236],
            [344, 295],
            [244, 354],
          ].map(([x, y]) => (
            <g key={x}>
              <path d={`M${x - 7} ${y}v25q7 9 14 0v-25`} fill="#eddfc1" />
              <ellipse cx={x} cy={y} rx="7" ry="4" fill="#e9ddc7" />
              <ellipse cx={x} cy={y} rx="3" ry="2" fill="#847660" />
            </g>
          ))}
          <g className="case-lid">
            <path
              d="M126 125l157-48 115 99v16l-157 49-115-101Z"
              fill="#c9bca3"
            />
            <path
              d="M126 125l157-48 115 99-157 49Z"
              fill="url(#ivory)"
              stroke="#eee4d1"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M${271 + i * 11} ${133 + i * 9}l31-10`}
                stroke="#8b7d66"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            <text
              x="202"
              y="145"
              fontFamily="Georgia"
              fontSize="20"
              fill="#94795a"
              transform="rotate(-16 202 145)"
            >
              nexo
            </text>
            {[
              [149, 128],
              [281, 95],
              [372, 176],
              [239, 218],
            ].map(([x, y]) => (
              <ellipse key={x} cx={x} cy={y} rx="4" ry="3" fill="#aaa08f" />
            ))}
          </g>
        </g>
      )}
    </svg>
  );
}

type Engine = {
  setPart: (part: PartId) => void;
  setView: (turn: number, zoom: number) => void;
  play: (reduced: boolean) => void;
  stop: () => void;
  dispose: () => void;
};
export default function ModelViewer({
  part,
  reduced,
}: {
  part: PartId;
  reduced: boolean;
}) {
  const host = useRef<HTMLDivElement>(null),
    engine = useRef<Engine | null>(null);
  const [webgl, setWebgl] = useState(false),
    [turn, setTurn] = useState(0),
    [zoom, setZoom] = useState(1),
    [action, setAction] = useState(false),
    [replay, setReplay] = useState(0);
  const actionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => {
    const container = host.current;
    if (!container || !window.WebGL2RenderingContext) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xfff7e9, 0x7d8985, 2.6));
    const key = new THREE.DirectionalLight(0xfff2dd, 4);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd4dfed, 2);
    fill.position.set(4, 1, -3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.5);
    rim.position.set(0, -3, 5);
    scene.add(rim);
    const root = new THREE.Group();
    scene.add(root);
    let model: ComponentModel | undefined,
      frame = 0,
      started = 0,
      animating = false,
      visible = true,
      disposed = false,
      baseYaw = 0.25;
    const draw = () => {
      if (!disposed) renderer.render(scene, camera);
    };
    const tick = (now: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const p = Math.min((now - started) / 1900, 1);
      model?.animate(p);
      draw();
      if (animating && p < 1) frame = requestAnimationFrame(tick);
      else animating = false;
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      animating = false;
      model?.animate(0);
      draw();
    };
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1),
        height = Math.max(rect.height, 1);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      draw();
    };
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    observer?.observe(container);
    window.addEventListener("resize", resize);
    const visibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", visibility);
    const intersection =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              visible = entries[0].isIntersecting;
              if (!visible) stop();
              else draw();
            },
            { rootMargin: "100px" },
          )
        : null;
    intersection?.observe(container);
    const lost = (e: Event) => {
      e.preventDefault();
      stop();
      setWebgl(false);
    };
    const restored = () => {
      setWebgl(true);
      resize();
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);
    engine.current = {
      setPart(id) {
        stop();
        if (model) {
          root.remove(model.group);
          disposeModel(model.group);
        }
        model = createComponentModel(id);
        root.add(model.group);
        baseYaw = id === "case" ? -0.52 : 0.25;
        root.rotation.set(-0.18, baseYaw, -0.035);
        resize();
      },
      setView(angle, scale) {
        root.rotation.y = baseYaw + angle;
        root.scale.setScalar(scale);
        draw();
      },
      play(isReduced) {
        stop();
        if (isReduced) {
          model?.animate(0.5);
          draw();
          return;
        }
        animating = true;
        started = performance.now();
        frame = requestAnimationFrame(tick);
      },
      stop,
      dispose() {
        disposed = true;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        intersection?.disconnect();
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", visibility);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        renderer.domElement.removeEventListener(
          "webglcontextrestored",
          restored,
        );
        if (model) disposeModel(model.group);
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      },
    };
    setWebgl(true);
    resize();
    return () => {
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);
  useEffect(() => {
    clearTimeout(actionTimer.current);
    setAction(false);
    setTurn(0);
    setZoom(1);
    engine.current?.setPart(part);
    engine.current?.setView(0, 1);
  }, [part]);
  useEffect(() => {
    engine.current?.setView(turn, zoom);
  }, [turn, zoom]);
  useEffect(() => {
    clearTimeout(actionTimer.current);
    setAction(false);
    engine.current?.stop();
  }, [reduced]);
  useEffect(() => () => clearTimeout(actionTimer.current), []);
  function play() {
    clearTimeout(actionTimer.current);
    setAction(false);
    engine.current?.play(reduced);
    setReplay((n) => n + 1);
    setAction(true);
    actionTimer.current = setTimeout(
      () => setAction(false),
      reduced ? 1200 : 1950,
    );
  }
  function reset() {
    clearTimeout(actionTimer.current);
    setAction(false);
    setTurn(0);
    setZoom(1);
    engine.current?.stop();
    engine.current?.setView(0, 1);
  }
  return (
    <div
      className={`hardware-stage ${webgl ? "has-webgl" : "has-fallback"}`}
      data-model={part}
    >
      <div className="model-topline micro">
        <span>
          OBJETO / 0{["chip", "servo", "arm", "case"].indexOf(part) + 1}
        </span>
        <span>{webgl ? "EXPLORAR EN 3D" : "VISTA ILUSTRADA"}</span>
      </div>
      <div
        className="model-viewport"
        role="img"
        aria-label={`Vista de ${part === "chip" ? "ESP32" : part === "case" ? "carcasa 3D" : part === "arm" ? "brazo" : "servomotor"}`}
      >
        <div ref={host} className="three-canvas" />
        {!webgl && (
          <div
            className="fallback-wrap"
            style={{ transform: `scale(${zoom}) rotate(${turn * 28}deg)` }}
          >
            <FallbackModel
              key={`${part}-${replay}`}
              part={part}
              action={action}
            />
          </div>
        )}
      </div>
      <div className="model-controls" aria-label="Controles del modelo">
        <div>
          <button
            type="button"
            aria-label="Girar a la izquierda"
            onClick={() => setTurn((n) => n - 0.35)}
          >
            ↶
          </button>
          <button
            type="button"
            aria-label="Girar a la derecha"
            onClick={() => setTurn((n) => n + 0.35)}
          >
            ↷
          </button>
        </div>
        <button type="button" className="model-play" onClick={play}>
          {reduced ? "Mostrar acción" : "Ver en acción"} <span>↗</span>
        </button>
        <div>
          <button
            type="button"
            aria-label="Alejar modelo"
            disabled={zoom <= 0.75}
            onClick={() => setZoom((n) => Math.max(0.75, n - 0.15))}
          >
            −
          </button>
          <button
            type="button"
            aria-label="Acercar modelo"
            disabled={zoom >= 1.3}
            onClick={() => setZoom((n) => Math.min(1.3, n + 0.15))}
          >
            +
          </button>
        </div>
      </div>
      <div className="model-bottom">
        <p>Modelo ilustrativo · Cada instalación se adapta a tu puerta.</p>
        <button type="button" onClick={reset}>
          Restablecer
        </button>
      </div>
    </div>
  );
}
