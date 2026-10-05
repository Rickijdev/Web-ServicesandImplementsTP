import { useId } from "react";

export function DoorArt({ open = false }: { open?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 640 680"
      className={`door-art ${open ? "is-open" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}wall`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#eeeee2" />
          <stop offset="1" stopColor="#d9ddc9" />
        </linearGradient>
        <linearGradient id={`${id}door`} x1="0" x2="1">
          <stop stopColor="#306452" />
          <stop offset=".7" stopColor="#497b64" />
          <stop offset="1" stopColor="#315b49" />
        </linearGradient>
        <linearGradient id={`${id}metal`}>
          <stop stopColor="#b0a78b" />
          <stop offset=".5" stopColor="#eee9d1" />
          <stop offset="1" stopColor="#c4bc9f" />
        </linearGradient>
        <filter id={`${id}shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <circle cx="425" cy="208" r="179" fill="#d6c7e3" />
      <path
        d="m129 541 285-58 199 116-310 58Z"
        fill="#17382b"
        opacity=".12"
        filter={`url(#${id}shadow)`}
      />
      <path
        d="M206 542V244c0-106 192-106 192 0v298Z"
        fill="#839883"
        transform="translate(25 -12)"
      />
      <path
        d="M183 545V241a123 123 0 0 1 246 0v304Z"
        fill={`url(#${id}wall)`}
      />
      <path d="M205 545V244a100 100 0 0 1 200 0v301Z" fill="#173f32" />
      <path d="M218 545V244a87 87 0 0 1 174 0v301Z" fill="#e5e9bf" />
      <g className="door-leaf">
        <path
          d="M218 545V244a87 87 0 0 1 174 0v301Z"
          fill={`url(#${id}door)`}
        />
        <path
          d="M234 526V246a71 71 0 0 1 142 0v280Z"
          fill="none"
          stroke="#abc0a4"
          strokeOpacity=".28"
        />
        {[252, 274, 296, 318, 340, 362].map((x, i) => (
          <path
            key={x}
            d={`M${x} ${[209, 192, 185, 185, 193, 211][i]}V525`}
            stroke="#173d2e"
            strokeOpacity=".28"
          />
        ))}
        <rect
          x="350"
          y="351"
          width="13"
          height="65"
          rx="6.5"
          fill={`url(#${id}metal)`}
        />
        <rect
          x="354"
          y="365"
          width="34"
          height="8"
          rx="4"
          fill={`url(#${id}metal)`}
        />
        <rect x="363" y="291" width="17" height="32" rx="5" fill="#e5e7d6" />
        <circle cx="371.5" cy="301" r="2" fill="#56765b" />
      </g>
      <path d="M179 545h258l14 17H162Z" fill="#bcc6ae" />
      <path d="M162 562h289v9H162Z" fill="#9fad97" />
      <path
        d="M474 502v-82m0 36c-43-8-46-41-39-61 28 9 41 28 39 61Zm1-8c36-8 47-31 43-53-26 2-45 21-43 53Zm-1-39c-21-12-26-35-17-58 18 13 26 31 17 58Z"
        fill="#637650"
      />
      <path d="M443 483h62l-8 58h-46Z" fill="#c48466" />
      <ellipse cx="474" cy="483" rx="31" ry="7" fill="#a36850" />
      <path
        d="M444 493h59m-57 12h55m-53 12h51m-49 12h47"
        stroke="#9a5c47"
        opacity=".35"
      />
    </svg>
  );
}

export function SpaceArt({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 420 460" className="space-art" aria-hidden="true">
      <path d="m30 372 176-78 187 67-174 92Z" fill="#183f35" opacity=".07" />
      {kind === "consultorio" ? (
        <>
          <path d="M96 359V131a110 110 0 0 1 220 0v228Z" fill="#eee9ef" />
          <path d="M113 359V135a93 93 0 0 1 186 0v224Z" fill="#a5a4bd" />
          <path d="M125 359V136a81 81 0 0 1 162 0v223Z" fill="#e7e2e9" />
          {[146, 173, 200, 227, 254, 281].map((x) => (
            <path key={x} d={`M${x} 108v251`} stroke="#c1b7ce" opacity=".6" />
          ))}
          <rect x="242" y="218" width="44" height="8" rx="4" fill="#606478" />
          <rect x="35" y="172" width="100" height="68" rx="2" fill="#f7f4eb" />
          <path d="M79 186v37m-18-19h37" stroke="#7c7897" strokeWidth="8" />
          <path
            d="M324 372v-92m0 26c-31-5-37-28-30-47 24 7 34 19 30 47Zm0-4c30-4 40-25 34-43-24 3-36 19-34 43Z"
            fill="#77835f"
          />
          <path d="M300 341h50l-6 43h-38Z" fill="#948eac" />
        </>
      ) : kind === "oficina" ? (
        <>
          <path d="M63 359V71h236v288Z" fill="#d4b69c" />
          <path d="M77 359V84h209v275Z" fill="#835b44" />
          {[93, 118, 143, 168, 193, 218, 243, 268].map((x) => (
            <path
              key={x}
              d={`M${x} 85v273`}
              stroke="#b98868"
              strokeWidth="3"
              opacity=".45"
            />
          ))}
          <rect x="247" y="218" width="11" height="51" rx="4" fill="#d4c9aa" />
          <path
            d="M251 229h30"
            stroke="#e8dec1"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <rect x="259" y="118" width="125" height="70" fill="#f0e9d8" />
          <path
            d="M321 128v39m-24-24h48m-23-9-21 11-10 15h21l-11-15m22-11 21 11-10 15h21l-11-15M308 172h28"
            stroke="#82684c"
            fill="none"
            strokeWidth="2"
          />
          <path d="M31 361h297l10 11H23Z" fill="#b59275" />
        </>
      ) : (
        <>
          <path d="M86 358V101h233v257Z" fill="#eff1ce" />
          <path d="M99 358V113h207v245Z" fill="#5e785b" />
          <path d="M110 124h83v140h-83Zm96 0h88v140h-88Z" fill="#d3ddc7" />
          <path d="m110 264 83-140h-30l-53 91Z" fill="#eaf0e0" opacity=".6" />
          <path d="M203 113v245M99 274h207" stroke="#415d43" strokeWidth="5" />
          <path d="M187 241v24m26-24v24" stroke="#f1e6ba" strokeWidth="5" />
          <path d="M68 88h270l-8 24H75Z" fill="#78966a" />
          <path
            d="M79 89h32v23H79Zm64 0h32v23h-32Zm64 0h32v23h-32Zm64 0h32v23h-32Z"
            fill="#e5e9bf"
          />
          <path d="m313 333 38-4 15 64h-68Z" fill="#f4f0d8" />
          <path
            d="m319 348 24-2m-23 11 25-2m-23 11 24-2"
            stroke="#8a9b6c"
            strokeWidth="3"
          />
        </>
      )}
    </svg>
  );
}

export function HardwareArt({ part = 0 }: { part?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 620 520"
      className={`hardware-art part-${part}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}shell`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f4f2e9" />
          <stop offset="1" stopColor="#cdd0bd" />
        </linearGradient>
      </defs>
      <ellipse
        cx="317"
        cy="413"
        rx="199"
        ry="35"
        fill="#153d2d"
        opacity=".12"
      />
      <g className="hardware-base">
        <path d="m131 318 207-94 160 73-204 101Z" fill="#d9ddc9" />
        <path d="M131 318v34l163 80v-34Z" fill="#a8b39e" />
        <path d="m294 398 204-101v34L294 432Z" fill="#c2cab5" />
        <path d="m147 318 191-82 143 63-187 91Z" fill="#b5c1a8" />
      </g>
      <g className="hardware-chip">
        <path d="m172 307 78-37 69 32-80 38Z" fill="#285741" />
        <path
          d="M172 307v12l67 33v-12Zm67 33 80-38v12l-80 38Z"
          fill="#173e30"
        />
        <path d="m214 301 36-16 32 15-36 17Z" fill="#c8cebd" />
        <path
          d="m180 308 26-12m-20 22 26-12m51 29 32-15"
          stroke="#e6cb85"
          strokeWidth="4"
        />
        <circle cx="228" cy="328" r="4" fill="#e4f59a" />
      </g>
      <g className="hardware-servo">
        <path d="m287 276 78-36 71 33-79 38Z" fill="#416267" />
        <path d="M287 276v62l70 34v-61Z" fill="#25494d" />
        <path d="m357 311 79-38v62l-79 37Z" fill="#325459" />
        <path d="m301 281 52 25v46l-52-25Z" fill="#597275" />
        <text
          x="310"
          y="306"
          fill="#e9ecdc"
          fontSize="12"
          transform="rotate(26 310 306)"
        >
          NEXO
        </text>
        <path d="M356 265v-30" stroke="#b3b899" strokeWidth="19" />
        <ellipse cx="356" cy="237" rx="14" ry="6" fill="#e7e5ce" />
      </g>
      <g className="hardware-arm">
        <path d="m301 207 94 44 27-12-92-44Z" fill="#eee6d5" />
        <path
          d="M301 207v12l94 44v-12Zm94 44 27-12v12l-27 12Z"
          fill="#bdbea7"
        />
        <ellipse cx="356" cy="231" rx="7" ry="3" fill="#797f67" />
      </g>
      <g className="hardware-lid">
        <path d="m182 157 144-65 136 63-144 72Z" fill={`url(#${id}shell)`} />
        <path d="M182 157v33l136 68v-31Z" fill="#b8c2ae" />
        <path d="m318 227 144-72v34l-144 69Z" fill="#dae0ce" />
        <path d="m299 143 33-15 39 18-34 16Z" fill="#849c7d" />
        <text
          x="248"
          y="166"
          fontSize="31"
          fontFamily="Arial,sans-serif"
          fontWeight="bold"
          fill="#244a37"
          transform="matrix(.92 .43 -1 .48 198 -28)"
        >
          nexo.
        </text>
      </g>
      <path
        d="M322 265v-48m-93 67v-65"
        stroke="#68855f"
        strokeDasharray="3 6"
        opacity=".45"
      />
    </svg>
  );
}
