import { useRef, useEffect, type FC } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import modelUrl from "@images/television.glb";

// Глобальный экземпляр сцены
let threeSceneInstance: {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  composer: EffectComposer;
  baseCameraPos: THREE.Vector3;
  modelLoaded: boolean;
} | null = null;

export const ThreeScene: FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  // Значения для параллакса
  let targetParallaxX = 0;
  let targetParallaxY = 0;
  let currentParallaxX = 0;
  let currentParallaxY = 0;

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    // Если сцена ещё не создана – создаём её
    if (!threeSceneInstance) {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      const baseCameraPos = new THREE.Vector3(0, 0, 5);
      camera.position.copy(baseCameraPos);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
      directionalLight.position.set(0, 0, 1);
      camera.add(directionalLight);
      scene.add(camera);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 2);
      scene.add(ambientLight);

      // Настройка постобработки
      const composer = new EffectComposer(renderer);
      composer.setSize(width, height);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.2,
        0.5,
        0.75
      );
      composer.addPass(bloomPass);
      const rgbShiftPass = new ShaderPass(RGBShiftShader);
      rgbShiftPass.uniforms["amount"].value = 0.001;
      composer.addPass(rgbShiftPass);

      // Загрузка 3D-модели
      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          // Центрирование модели
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);

          // Подгоняем позицию камеры в зависимости от размеров модели
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 130);
          let distance = maxDim / (2 * Math.tan(fov / 2));
          distance *= 1.8;
          baseCameraPos.set(0, 0, distance);
          camera.position.copy(baseCameraPos);
          camera.lookAt(new THREE.Vector3(0, 0, 0));

          scene.add(model);
          threeSceneInstance!.modelLoaded = true;
        },
        undefined,
        (error) => {
          console.error("Ошибка при загрузке модели:", error);
        }
      );

      threeSceneInstance = {
        renderer,
        scene,
        camera,
        composer,
        baseCameraPos,
        modelLoaded: false,
      };

      // Коэффициенты параллакса
      const parallaxFactor = 1.1;
      const lerpFactor = 0.015;

      const animate = () => {
        requestAnimationFrame(animate);

        // Плавное приближение текущих значений к целевым
        currentParallaxX += (targetParallaxX - currentParallaxX) * lerpFactor;
        currentParallaxY += (targetParallaxY - currentParallaxY) * lerpFactor;

        // Обновляем позицию камеры
        camera.position.x = baseCameraPos.x + currentParallaxX * parallaxFactor;
        camera.position.y = baseCameraPos.y - currentParallaxY * parallaxFactor;
        // Здесь можно указать нужную точку обзора
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        composer.render();
      };
      animate();

      const handleResize = () => {
        const newWidth = mountRef.current?.clientWidth || window.innerWidth;
        const newHeight = mountRef.current?.clientHeight || window.innerHeight;
        renderer.setSize(newWidth, newHeight);
        composer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      // Обработчик движения мыши для параллакса
      const onMouseMove = (event: MouseEvent) => {
        targetParallaxX =
          (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetParallaxY =
          (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      };
      window.addEventListener("mousemove", onMouseMove);

      // В cleanup удаляем только глобальные обработчики
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", onMouseMove);
      };
    } else {
      // Если сцена уже создана – прикрепляем renderer к текущему контейнеру
      mountRef.current.appendChild(threeSceneInstance.renderer.domElement);

      const onMouseMove = (event: MouseEvent) => {
        targetParallaxX =
          (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetParallaxY =
          (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      };
      window.addEventListener("mousemove", onMouseMove);

      const handleResize = () => {
        const newWidth = mountRef.current?.clientWidth || window.innerWidth;
        const newHeight = mountRef.current?.clientHeight || window.innerHeight;
        threeSceneInstance!.renderer.setSize(newWidth, newHeight);
        threeSceneInstance!.composer.setSize(newWidth, newHeight);
        threeSceneInstance!.camera.aspect = newWidth / newHeight;
        threeSceneInstance!.camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", handleResize);
        if (
          mountRef.current &&
          threeSceneInstance &&
          threeSceneInstance.renderer.domElement.parentElement ===
            mountRef.current
        ) {
          mountRef.current.removeChild(threeSceneInstance.renderer.domElement);
        }
      };
    }
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default ThreeScene;
